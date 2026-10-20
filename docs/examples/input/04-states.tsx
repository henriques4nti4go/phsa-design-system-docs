/**
 * @title Estados
 * @description `disabled` bloqueia o campo, `readOnly` deixa só ler e copiar, e `error` mostra a mensagem e marca o campo como inválido.
 */
"use client";

import { Input, Stack } from "@phsa.tec/design-system-react/react";

export default function InputStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Input label="Desabilitado" value="Belo Horizonte" disabled />
      <Input label="Somente leitura" value="PED-2026-00481" readOnly />
      <Input label="CPF" value="123.456.789-00" error="CPF inválido. Confira os dígitos." />
      <Input
        label="Senha"
        type="password"
        value="1234"
        errors={["Use pelo menos 8 caracteres.", "Inclua um número e uma letra maiúscula."]}
      />
    </Stack>
  );
}
