/**
 * @title Horizontal
 * @description O padrão: uma linha que ocupa toda a largura e separa blocos de conteúdo.
 */
"use client";

import { Separator, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function SeparatorHorizontal() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Stack gap="xs">
        <Text variant="h4">Maria Oliveira</Text>
        <Text tone="muted">Analista financeira em Campinas, SP</Text>
      </Stack>
      <Separator />
      <Text>Responsável pelo fechamento mensal e pela conciliação bancária.</Text>
    </Stack>
  );
}
