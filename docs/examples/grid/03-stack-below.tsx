/**
 * @title Responsivo
 * @description `stackBelow` vira a grade em uma coluna só abaixo do breakpoint (`sm`, `md` ou `lg`), comum em layouts de duas colunas.
 */
"use client";

import { Grid, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function GridStackBelow() {
  return (
    <Stack maxWidth="2xl">
      <Grid columns={2} stackBelow="md" gap="md">
        <Stack background="muted" padding="lg" radius="md" gap="xs">
          <Text weight="semibold">Dados pessoais</Text>
          <Text variant="small" tone="muted">
            Lado a lado no desktop.
          </Text>
        </Stack>
        <Stack background="muted" padding="lg" radius="md" gap="xs">
          <Text weight="semibold">Endereço de entrega</Text>
          <Text variant="small" tone="muted">
            Um embaixo do outro no celular.
          </Text>
        </Stack>
      </Grid>
    </Stack>
  );
}
