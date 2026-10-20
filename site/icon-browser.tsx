"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Icon, Input, Select, Sheet, Slider, Spinner, Stack, Text } from "@phsa.tec/design-system-react/react";
import type { IconNode } from "@phsa.tec/design-system-react/icon";
import { LayoutGrid } from "@phsa.tec/design-system-react/icons/layout-grid";
import { Search } from "@phsa.tec/design-system-react/icons/search";
import { CodeBlock } from "./code-block";
import { NavLink } from "./nav-link";
import styles from "./site.module.css";

type IconEntry = {
  name: string;
  exportName: string;
  tags: string[];
  categories: string[];
  node: IconNode;
};
type IconData = { categories: Record<string, string>; icons: IconEntry[] };

// Títulos das categorias do Lucide em português (o slug continua o do Lucide, na URL).
const CATEGORY_LABELS: Record<string, string> = {
  accessibility: "Acessibilidade",
  account: "Conta",
  animals: "Animais",
  arrows: "Setas",
  buildings: "Construções",
  charts: "Gráficos",
  communication: "Comunicação",
  connectivity: "Conectividade",
  cursors: "Cursores",
  design: "Design",
  development: "Desenvolvimento",
  devices: "Dispositivos",
  emoji: "Emoji",
  files: "Arquivos",
  finance: "Finanças",
  "food-beverage": "Comida e bebida",
  gaming: "Jogos",
  home: "Casa",
  layout: "Layout",
  mail: "E-mail",
  math: "Matemática",
  medical: "Saúde",
  multimedia: "Multimídia",
  nature: "Natureza",
  navigation: "Navegação",
  notifications: "Notificações",
  people: "Pessoas",
  photography: "Fotografia",
  science: "Ciência",
  seasons: "Estações",
  security: "Segurança",
  shapes: "Formas",
  shopping: "Compras",
  social: "Social",
  sports: "Esportes",
  sustainability: "Sustentabilidade",
  text: "Texto",
  time: "Tempo",
  tools: "Ferramentas",
  transportation: "Transporte",
  travel: "Viagem",
  weather: "Clima",
};

const PAGE = 240;
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/** Menor nota = mais relevante; `null` = não bate. Todas as palavras precisam bater no nome ou numa tag. */
function score(icon: IconEntry, words: string[]) {
  let best = Infinity;
  for (const word of words) {
    const name = icon.name;
    const value =
      name === word
        ? 0
        : name.startsWith(word)
          ? 1
          : name.includes(word)
            ? 2
            : icon.tags.includes(word)
              ? 3
              : icon.tags.some((tag) => tag.includes(word))
                ? 4
                : null;
    if (value === null) return null;
    best = Math.min(best, value);
  }
  return best;
}

/** SVG simples para a grade: 1.900 `phsa-icon` (cada um com Shadow DOM) pesariam demais. */
function GlyphSvg({ node }: { node: IconNode }) {
  return (
    <svg className={styles.glyph} viewBox="0 0 24 24" aria-hidden="true">
      {node.map(([tag, attrs], index) => createElement(tag, { key: index, ...attrs }))}
    </svg>
  );
}

export function IconBrowser({ version }: { version: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("categoria") ?? "";
  const selectedName = params.get("icone") ?? "";

  const [data, setData] = useState<IconData | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [strokeWidth, setStrokeWidth] = useState(2);

  useEffect(() => {
    let alive = true;
    fetch("/icons.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((json: IconData) => alive && setData(json))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  // Busca, categoria e ícone aberto ficam na URL: dá para mandar o link.
  const setParam = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const search = next.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, {
      scroll: false,
    });
  };

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const icon of data?.icons ?? []) for (const slug of icon.categories) result[slug] = (result[slug] ?? 0) + 1;
    return result;
  }, [data]);

  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const results = useMemo(() => {
    const inCategory = (data?.icons ?? []).filter((icon) => !category || icon.categories.includes(category));
    if (!words.length) return inCategory;
    return inCategory
      .map((icon) => ({ icon, rank: score(icon, words) }))
      .filter((entry): entry is { icon: IconEntry; rank: number } => entry.rank !== null)
      .sort((a, b) => a.rank - b.rank || a.icon.name.localeCompare(b.icon.name))
      .map((entry) => entry.icon);
    // `words` muda de identidade a cada render; a busca normalizada é a dependência real.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, category, words.join(" ")]);

  // Desenha aos poucos, conforme a rolagem. O limite volta ao início quando o filtro muda.
  const filterKey = `${category}|${words.join(" ")}`;
  const [limit, setLimit] = useState({ key: filterKey, count: PAGE });
  const visibleCount = limit.key === filterKey ? limit.count : PAGE;
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sentinel.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLimit({ key: filterKey, count: visibleCount + PAGE });
      },
      { rootMargin: "600px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [filterKey, visibleCount, results.length]);

  const selected = data?.icons.find((icon) => icon.name === selectedName) ?? null;
  const categoryLabel = (slug: string) => CATEGORY_LABELS[slug] ?? data?.categories[slug] ?? slug;
  const categorySlugs = Object.keys(data?.categories ?? {}).sort((a, b) =>
    categoryLabel(a).localeCompare(categoryLabel(b), "pt-BR"),
  );
  const total = data?.icons.length ?? 0;

  const categoryLink = (slug: string, label: string, count: number) => {
    const next = new URLSearchParams(params.toString());
    next.delete("icone");
    if (slug) next.set("categoria", slug);
    else next.delete("categoria");
    const search = next.toString();
    return (
      <NavLink
        key={slug || "all"}
        href={search ? `${pathname}?${search}` : pathname}
        className={styles.navLink}
        aria-current={category === slug ? "page" : undefined}
      >
        <span className={styles.navCount}>
          {label}
          <span>{count}</span>
        </span>
      </NavLink>
    );
  };

  return (
    <div className={`${styles.container} ${styles.docsGrid}`}>
      <aside className={styles.sidebar}>
        <Stack as="nav" gap="xs" aria-label="Categorias de ícones">
          <Stack direction="row" align="center" gap="sm" padding="xs">
            <Icon icon={LayoutGrid} size="sm" tone="muted" />
            <Text variant="small" weight="semibold" as="span">
              Categorias
            </Text>
          </Stack>
          <Stack gap="none">
            {categoryLink("", "Todos", total)}
            {categorySlugs.map((slug) => categoryLink(slug, categoryLabel(slug), counts[slug] ?? 0))}
          </Stack>
        </Stack>
      </aside>

      <main className={styles.content}>
        <Stack gap="lg">
          <Stack gap="sm">
            <Text variant="h1">Ícones</Text>
            <Text variant="lead" tone="muted">
              {total ? total.toLocaleString("pt-BR") : "Os"} ícones do Lucide v{version}, com um import por ícone: só os
              que você usa entram no bundle.
            </Text>
          </Stack>

          <div className={styles.iconToolbar}>
            <Input
              placeholder="Buscar em inglês: trash, arrow, user…"
              aria-label="Buscar ícone"
              value={query}
              clearable
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setQuery(value);
                setParam({ q: value.trim(), icone: "" });
              }}
            >
              <Icon slot="prefix" icon={Search} size="sm" />
            </Input>
            <div className={styles.mobileOnly}>
              <Select
                aria-label="Categoria"
                value={category}
                onChange={(e) =>
                  setParam({
                    categoria: (e.target as HTMLSelectElement).value,
                    icone: "",
                  })
                }
              >
                <option value="">Todas as categorias</option>
                {categorySlugs.map((slug) => (
                  <option key={slug} value={slug}>
                    {categoryLabel(slug)}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {failed ? (
            <Text tone="muted">Não foi possível carregar os ícones. Rode `yarn icons` e recarregue a página.</Text>
          ) : !data ? (
            <Stack direction="row" align="center" gap="sm" justify="center" padding="xl">
              <Spinner size="sm" />
              <Text tone="muted" as="span">
                Carregando ícones…
              </Text>
            </Stack>
          ) : (
            <Stack gap="md">
              <Text variant="small" tone="muted">
                {results.length.toLocaleString("pt-BR")} {results.length === 1 ? "ícone" : "ícones"}
                {category ? ` em ${categoryLabel(category)}` : ""}
                {words.length ? ` para “${query.trim()}”` : ""}
              </Text>

              {results.length === 0 ? (
                <Text tone="muted" align="center">
                  Nenhum ícone encontrado. As tags do Lucide são em inglês: tente “delete” em vez de “excluir”.
                </Text>
              ) : (
                <div className={styles.iconGrid}>
                  {results.slice(0, visibleCount).map((icon) => (
                    <button
                      key={icon.name}
                      type="button"
                      className={styles.iconTile}
                      title={icon.name}
                      aria-pressed={icon.name === selectedName}
                      onClick={() => setParam({ icone: icon.name })}
                    >
                      <GlyphSvg node={icon.node} />
                      <span className={styles.iconName}>{icon.name}</span>
                    </button>
                  ))}
                </div>
              )}
              {visibleCount < results.length && <div ref={sentinel} className={styles.sentinel} />}
            </Stack>
          )}
        </Stack>
      </main>

      <Sheet
        open={selected !== null}
        side="right"
        heading={selected?.exportName ?? ""}
        description={selected?.name}
        onClose={() => setParam({ icone: "" })}
      >
        {selected && (
          <Stack gap="lg">
            <Stack background="muted" radius="lg" padding="xl" align="center" gap="lg">
              <Stack direction="row" align="end" gap="lg" justify="center" wrap>
                {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                  <Icon key={size} icon={selected.node} size={size} strokeWidth={strokeWidth} />
                ))}
              </Stack>
              <Stack direction="row" gap="md" justify="center" wrap>
                {(["primary", "success", "warning", "destructive", "info", "muted"] as const).map((tone) => (
                  <Icon key={tone} icon={selected.node} size="lg" tone={tone} strokeWidth={strokeWidth} />
                ))}
              </Stack>
            </Stack>

            <Slider
              label="Espessura do traço (strokeWidth)"
              min={1}
              max={3}
              step={0.25}
              showValue
              value={String(strokeWidth)}
              onChange={(e) => setStrokeWidth(Number((e.target as HTMLInputElement).value))}
            />

            <Stack gap="sm">
              <Text variant="small" weight="semibold">
                Como usar
              </Text>
              <CodeBlock
                code={`import { Icon } from "@phsa.tec/design-system-react/react";
import { ${selected.exportName} } from "@phsa.tec/design-system-react/icons/${selected.name}";

<Icon icon={${selected.exportName}}${strokeWidth === 2 ? "" : ` strokeWidth={${strokeWidth}}`} />`}
              />
            </Stack>

            {selected.categories.length > 0 && (
              <Stack gap="sm">
                <Text variant="small" weight="semibold">
                  Categorias
                </Text>
                <Stack direction="row" gap="xs" wrap>
                  {selected.categories.map((slug) => (
                    <Badge key={slug} variant="secondary">
                      {categoryLabel(slug)}
                    </Badge>
                  ))}
                </Stack>
              </Stack>
            )}

            {selected.tags.length > 0 && (
              <Stack gap="sm">
                <Text variant="small" weight="semibold">
                  Tags
                </Text>
                <Stack direction="row" gap="xs" wrap>
                  {selected.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
      </Sheet>
    </div>
  );
}
