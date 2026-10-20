/**
 * @title Com texto
 * @description `label` (padrão "Carregando") é o que o leitor de tela anuncia; o texto visível ao lado é opcional.
 */
"use client";

import { Spinner, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function SpinnerWithText() {
  return (
    <Stack direction="row" gap="sm" align="center">
      <Spinner size="sm" label="Buscando pedidos" />
      <Text tone="muted">Buscando seus pedidos…</Text>
    </Stack>
  );
}
