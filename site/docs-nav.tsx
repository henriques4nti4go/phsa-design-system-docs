"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, Input, Stack, Text } from "@phsa.tec/design-system-react/react";
import { BookOpen } from "@phsa.tec/design-system-react/icons/book-open";
import { Search } from "@phsa.tec/design-system-react/icons/search";
import type { NavGroup } from "@/docs/server";
import { CATEGORY_ICONS, type IconType } from "./category-icons";
import { NavLink } from "./nav-link";
import styles from "./site.module.css";

const normalize = (text: string) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/** Lista de componentes por categoria: barra lateral no desktop e conteúdo do sheet no celular. */
export function DocsNav({ groups, onNavigate }: { groups: NavGroup[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const term = normalize(query.trim());
  const filtered = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !term || normalize(`${item.name} ${item.slug}`).includes(term)),
    }))
    .filter((group) => group.items.length > 0);

  const link = (href: string, label: string) => (
    <NavLink
      key={href}
      href={href}
      className={styles.navLink}
      aria-current={pathname === href ? "page" : undefined}
      onNavigate={() => {
        setQuery("");
        onNavigate?.();
      }}
    >
      {label}
    </NavLink>
  );

  const section = (key: string, icon: IconType, label: string, items: { href: string; label: string }[]) => (
    <Stack key={key} gap="xs">
      <Stack direction="row" align="center" gap="sm" padding="xs">
        <Icon icon={icon} size="sm" tone="muted" />
        <Text variant="small" weight="semibold" as="span">
          {label}
        </Text>
      </Stack>
      <Stack gap="none">{items.map((item) => link(item.href, item.label))}</Stack>
    </Stack>
  );

  return (
    <Stack as="nav" gap="lg" aria-label="Componentes">
      <div className={styles.navSearch}>
        <Input
          size="sm"
          placeholder="Buscar componente…"
          value={query}
          clearable
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        >
          <Icon slot="prefix" icon={Search} size="sm" />
        </Input>
      </div>

      {!term && section("start", BookOpen, "Primeiros passos", [{ href: "/components", label: "Visão geral" }])}

      {filtered.map((group) =>
        section(
          group.id,
          CATEGORY_ICONS[group.id],
          group.label,
          group.items.map((item) => ({ href: `/components/${item.slug}`, label: item.name })),
        ),
      )}

      {filtered.length === 0 && (
        <Text variant="small" tone="muted" align="center">
          Nenhum componente para “{query}”.
        </Text>
      )}
    </Stack>
  );
}
