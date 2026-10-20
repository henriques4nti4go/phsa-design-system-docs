/**
 * @title Corte e alinhamento
 * @description `truncate` corta o texto em uma linha com reticências; `align` alinha no início, no centro ou no fim.
 */
"use client";

import { Stack, Text } from "@phsa.tec/design-system-react/react";

export default function TextTruncateAlign() {
  return (
    <Stack gap="md" maxWidth="xs">
      <Text truncate>
        Rua Doutor Arnaldo, 455 — Cerqueira César, São Paulo - SP, 01246-903
      </Text>
      <Text align="start">Início</Text>
      <Text align="center">Centro</Text>
      <Text align="end">Fim</Text>
    </Stack>
  );
}
