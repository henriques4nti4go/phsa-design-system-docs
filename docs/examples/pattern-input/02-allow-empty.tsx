/**
 * @title Espaços visíveis
 * @description `allow-empty` mostra o caractere de `mask` nos espaços que ainda faltam preencher.
 */
"use client";

import { PatternInput, Stack } from "@phsa.tec/design-system-react/react";

export default function PatternInputAllowEmpty() {
  return (
    <Stack maxWidth="sm" gap="md">
      <PatternInput label="Placa" format="AAA-#*##" allowEmpty placeholder="ABC-1D23" />
      <PatternInput label="Data de validade" format="##/##" mask="•" allowEmpty placeholder="MM/AA" />
    </Stack>
  );
}
