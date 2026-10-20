"use client";

import { Badge, Grid, Icon, Separator, Stack, Text } from "@phsa.tec/design-system-react/react";
import type { NavGroup } from "@/docs/server";
import { CATEGORY_ICONS } from "./category-icons";
import { CodeBlock } from "./code-block";
import { NavLink } from "./nav-link";
import styles from "./site.module.css";

const QUICK_START = `"use client";

import { Button, Input } from "@phsa.tec/design-system-react/react";

export function Signup() {
  return (
    <form>
      <Input name="email" type="email" label="E-mail" required />
      <Button type="submit">Criar conta</Button>
    </form>
  );
}`;

export function ComponentsOverview({ groups, version }: { groups: NavGroup[]; version: string }) {
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className={styles.article}>
      <Stack gap="2xl">
        <Stack gap="sm">
          <Text variant="h1">Componentes</Text>
          <Text variant="lead" tone="muted">
            {total} componentes em Web Components, com Shadow DOM e estilos próprios. Funcionam em React, Next.js (com
            SSR) e em qualquer framework, sem configuração.
          </Text>
        </Stack>

        <Stack gap="md">
          <Stack gap="sm">
            <Text variant="h2">Instalação</Text>
            <Separator />
          </Stack>
          <CodeBlock code={`npm install @phsa.tec/design-system-react@${version}`} language="bash" />
          <Text tone="muted">
            Importe os componentes que for usar: os tokens de tema são injetados no primeiro import, sem CSS global, sem
            Tailwind config e sem plugin de build.
          </Text>
          <CodeBlock code={QUICK_START} label="React" />
        </Stack>

        {groups.map((group) => (
          <Stack key={group.id} as="section" gap="md">
            <Stack gap="sm">
              <Stack direction="row" align="center" gap="sm">
                <Icon icon={CATEGORY_ICONS[group.id]} size="md" tone="muted" />
                <Text variant="h2">{group.label}</Text>
                <Badge variant="secondary">{group.items.length}</Badge>
              </Stack>
              <Separator />
            </Stack>
            <Grid minItemWidth="14rem" gap="md">
              {group.items.map((item) => (
                <NavLink key={item.slug} href={`/components/${item.slug}`} className={styles.cardLink}>
                  <Stack gap="xs">
                    <Text weight="semibold" as="span">
                      {item.name}
                    </Text>
                    <Text variant="small" tone="muted">
                      {item.summary}
                    </Text>
                  </Stack>
                </NavLink>
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}
