/**
 * @title Direção
 * @description `direction` empilha os itens em coluna (padrão) ou lado a lado com `row`.
 */
"use client";

import { Grid, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function StackDirection() {
  return (
    <Stack maxWidth="lg">
      <Grid columns={2} gap="xl" stackBelow="sm">
        <Stack gap="sm">
          <Text variant="small" tone="muted">
            column
          </Text>
          <Stack background="muted" padding="md" radius="md">1</Stack>
          <Stack background="muted" padding="md" radius="md">2</Stack>
          <Stack background="muted" padding="md" radius="md">3</Stack>
        </Stack>
        <Stack gap="sm">
          <Text variant="small" tone="muted">
            row
          </Text>
          <Stack direction="row" gap="sm">
            <Stack background="muted" padding="md" radius="md">1</Stack>
            <Stack background="muted" padding="md" radius="md">2</Stack>
            <Stack background="muted" padding="md" radius="md">3</Stack>
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  );
}
