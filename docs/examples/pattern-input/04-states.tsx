/**
 * @title Estados
 * @description `error` mostra a mensagem e marca o campo como inválido; `disabled` e `readOnly` bloqueiam a edição.
 */
"use client";

import { PatternInput, Stack } from "@phsa.tec/design-system-react/react";

export default function PatternInputStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <PatternInput label="CPF" format="###.###.###-##" value="12345678900" error="CPF inválido." />
      <PatternInput label="CEP" format="#####-###" value="01310100" readOnly />
      <PatternInput label="Telefone" format="(##) #####-####" placeholder="(00) 00000-0000" disabled />
    </Stack>
  );
}
