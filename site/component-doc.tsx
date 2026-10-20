"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Cell,
  Column,
  Grid,
  Icon,
  Row,
  Separator,
  Skeleton,
  Stack,
  Tab,
  TabPanel,
  Table,
  Tabs,
  Text,
} from "@phsa.tec/design-system-react/react";
import { Code } from "@phsa.tec/design-system-react/icons/code";
import type { ApiRow, ComponentPage, ElementApi, Example } from "@/docs/server";
import { examples } from "@/docs/examples";
import { GitHub, REPOSITORY } from "./brand";
import { CodeBlock, RichText } from "./code-block";
import { NavLink } from "./nav-link";
import { Toc, type TocItem } from "./toc";
import styles from "./site.module.css";

const PACKAGE = "@phsa.tec/design-system-react";

type Sibling = { slug: string; name: string } | null;

const exampleId = (example: Example) => `exemplo-${example.key.split("/")[1].replace(/^\d+-/, "")}`;
const apiId = (element: ElementApi) => `api-${element.tag}`;

export function ComponentDoc({ page, prev, next }: { page: ComponentPage; prev: Sibling; next: Sibling }) {
  const reactNames = page.elements.map((e) => e.react);
  const entryPoints = [page.slug, ...(page.include ?? [])];

  const reactImport = [
    `import { ${reactNames.join(", ")} } from "${PACKAGE}/react";`,
    ...(page.slug === "toast" ? [`import { toast } from "${PACKAGE}/toast";`] : []),
    ...(page.slug === "icon" ? [`import { Heart } from "${PACKAGE}/icons/heart";`] : []),
  ].join("\n");

  const elementImport = [
    ...entryPoints.map((entry) => `import "${PACKAGE}/${entry}";`),
    "",
    ...page.elements.slice(0, 1).map((e) => `<${e.tag}></${e.tag}>`),
  ].join("\n");

  const toc: TocItem[] = [
    { id: "importacao", label: "Importação" },
    ...(page.examples.length
      ? [{ id: "exemplos", label: "Exemplos" }, ...page.examples.map((e) => ({ id: exampleId(e), label: e.title, nested: true }))]
      : []),
    { id: "api", label: "API" },
    ...(page.elements.length > 1 ? page.elements.map((e) => ({ id: apiId(e), label: `<${e.tag}>`, nested: true })) : []),
  ];

  return (
    <div className={styles.pageGrid}>
      <article className={styles.article}>
        <Stack gap="2xl">
          <Stack gap="md">
            <Breadcrumb>
              <BreadcrumbItem href="/components">Componentes</BreadcrumbItem>
              <BreadcrumbItem>{page.categoryLabel}</BreadcrumbItem>
              <BreadcrumbItem current>{page.name}</BreadcrumbItem>
            </Breadcrumb>
            <Stack gap="sm">
              <Text variant="h1">{page.name}</Text>
              <Text variant="lead" tone="muted">
                <RichText text={page.description} />
              </Text>
            </Stack>
            <Stack direction="row" align="center" gap="sm" wrap>
              {page.elements.map((e) => (
                <Badge key={e.tag} variant="secondary">
                  {`<${e.tag}>`}
                </Badge>
              ))}
              <NavLink href={`${REPOSITORY}/tree/master/src/components/${page.category}/${page.slug}`} className={styles.topLink}>
                <Stack direction="row" align="center" gap="xs">
                  <Icon icon={GitHub} size="xs" />
                  Código-fonte
                </Stack>
              </NavLink>
            </Stack>
          </Stack>

          <Section id="importacao" title="Importação">
            <Text tone="muted">
              Cada componente tem o próprio entry point: só o que você importa entra no bundle. Não há CSS para importar
              nem configuração.
            </Text>
            <Tabs value="react">
              <Tab slot="tab" value="react">
                React
              </Tab>
              <Tab slot="tab" value="element">
                Web Component
              </Tab>
              <TabPanel value="react">
                <CodeBlock code={reactImport} label="React 18+ / Next.js" />
              </TabPanel>
              <TabPanel value="element">
                <CodeBlock code={elementImport} label="HTML, Vue, Svelte, Angular, React 19" />
              </TabPanel>
            </Tabs>
          </Section>

          {page.examples.length > 0 && (
            <Section id="exemplos" title="Exemplos">
              <Stack gap="2xl">
                {page.examples.map((example) => (
                  <ExampleView key={example.key} example={example} />
                ))}
              </Stack>
            </Section>
          )}

          <Section id="api" title="API">
            <Text tone="muted">
              Gerada do <code className={styles.inlineCode}>custom-elements.json</code> do pacote. Em React, os atributos
              viram props em camelCase e os eventos viram <code className={styles.inlineCode}>on</code> + nome.
            </Text>
            <Stack gap="2xl">
              {page.elements.map((element, i) => (
                // A descrição do principal já está no topo da página.
                <ElementApiView key={element.tag} element={element} showDescription={i > 0} />
              ))}
            </Stack>
          </Section>

          <Grid columns={2} gap="md">
            {prev ? <PagerLink sibling={prev} label="Anterior" /> : <span />}
            {next ? <PagerLink sibling={next} label="Próximo" alignEnd /> : <span />}
          </Grid>
        </Stack>
      </article>

      <aside className={styles.toc}>
        <Toc items={toc} />
      </aside>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section>
      <Stack gap="md">
        <div id={id} className={styles.anchor}>
          <Stack gap="sm">
            <Text variant="h2">{title}</Text>
            <Separator />
          </Stack>
        </div>
        {children}
      </Stack>
    </section>
  );
}

function PagerLink({ sibling, label, alignEnd }: { sibling: NonNullable<Sibling>; label: string; alignEnd?: boolean }) {
  return (
    <NavLink href={`/components/${sibling.slug}`} className={styles.cardLink}>
      <Stack gap="xs" align={alignEnd ? "end" : "start"}>
        <Text variant="small" tone="muted" as="span">
          {label}
        </Text>
        <Text weight="semibold" as="span">
          {alignEnd ? `${sibling.name} →` : `← ${sibling.name}`}
        </Text>
      </Stack>
    </NavLink>
  );
}

function ExampleView({ example }: { example: Example }) {
  const Preview = examples[example.key];
  const [showCode, setShowCode] = useState(false);

  return (
    <Stack gap="sm">
      <div id={exampleId(example)} className={styles.anchor}>
        <Text variant="h3">{example.title}</Text>
      </div>
      {example.description && (
        <Text tone="muted">
          <RichText text={example.description} />
        </Text>
      )}
      <div className={styles.example}>
        <div className={styles.preview}>
          {Preview ? <Preview /> : <Text tone="muted">Rode `yarn examples` para registrar este exemplo.</Text>}
        </div>
        <div className={styles.exampleBar}>
          <Button type="button" variant="ghost" size="sm" aria-expanded={showCode} onClick={() => setShowCode((v) => !v)}>
            <Icon icon={Code} size="sm" />
            {showCode ? "Ocultar código" : "Ver código"}
          </Button>
        </div>
        {showCode && <CodeBlock code={example.code} label="React" attached />}
      </div>
    </Stack>
  );
}

const noop = () => () => {};

/** `false` no SSR e na hidratação, `true` depois. */
function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}

function ElementApiView({ element, showDescription }: { element: ElementApi; showDescription: boolean }) {
  return (
    <Stack gap="md">
      <div id={apiId(element)} className={styles.anchor}>
        <Stack direction="row" align="baseline" gap="sm" wrap>
          <Text variant="h3">{`<${element.tag}>`}</Text>
          <Text tone="muted" as="span">
            React: <code className={styles.inlineCode}>{`<${element.react}>`}</code>
          </Text>
        </Stack>
      </div>
      {showDescription && element.description && (
        <Text tone="muted">
          <RichText text={element.description} />
        </Text>
      )}
      <ApiTable
        caption="Atributos"
        rows={element.attributes}
        columns={[
          ["Atributo", (r) => <Mono>{r.name}</Mono>],
          ["Prop React", (r) => <Mono>{r.react}</Mono>],
          ["Tipo", (r) => <Mono>{r.type}</Mono>],
          ["Padrão", (r) => <Mono>{r.default}</Mono>],
          ["Descrição", (r) => <RichText text={r.description ?? ""} />],
        ]}
      />
      <ApiTable
        caption="Propriedades (só JavaScript)"
        rows={element.properties}
        columns={[
          ["Propriedade", (r) => <Mono>{r.name}</Mono>],
          ["Tipo", (r) => <Mono>{r.type}</Mono>],
          ["Descrição", (r) => <RichText text={r.description ?? ""} />],
        ]}
      />
      <ApiTable
        caption="Eventos"
        rows={element.events}
        columns={[
          ["Evento", (r) => <Mono>{r.name}</Mono>],
          ["Prop React", (r) => <Mono>{r.react}</Mono>],
          ["Descrição", (r) => <RichText text={r.description ?? ""} />],
        ]}
      />
      <ApiTable
        caption="Métodos"
        rows={element.methods}
        columns={[
          ["Método", (r) => <Mono>{r.name}</Mono>],
          ["Descrição", (r) => <RichText text={r.description ?? ""} />],
        ]}
      />
      <ApiTable
        caption="Slots"
        rows={element.slots}
        columns={[
          ["Slot", (r) => <Mono>{r.name}</Mono>],
          ["Descrição", (r) => <RichText text={r.description ?? ""} />],
        ]}
      />
      <ApiTable
        caption="CSS parts"
        rows={element.parts}
        columns={[
          ["Part", (r) => <Mono>{`::part(${r.name})`}</Mono>],
          ["Descrição", (r) => <RichText text={r.description ?? ""} />],
        ]}
      />
    </Stack>
  );
}

function Mono({ children }: { children?: string }) {
  return children ? <code className={styles.inlineCode}>{children}</code> : <Text tone="muted" as="span">—</Text>;
}

function ApiTable({
  caption,
  rows,
  columns,
}: {
  caption: string;
  rows: ApiRow[];
  columns: [label: string, render: (row: ApiRow) => ReactNode][];
}) {
  // Como no playground: a phsa-table monta no cliente.
  const mounted = useMounted();
  if (!rows.length) return null;
  if (!mounted) return <Skeleton variant="rectangular" />;
  return (
    <Table caption={caption}>
      {columns.map(([label]) => (
        <Column key={label} label={label} />
      ))}
      {rows.map((row) => (
        <Row key={row.name}>
          {columns.map(([label, render]) => (
            <Cell key={label}>{render(row)}</Cell>
          ))}
        </Row>
      ))}
    </Table>
  );
}
