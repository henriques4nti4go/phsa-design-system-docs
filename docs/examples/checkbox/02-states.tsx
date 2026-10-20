/**
 * @title Estados
 * @description `disabled` bloqueia a caixa marcada ou não; `error` mostra a mensagem e pinta a borda de vermelho.
 */
"use client";

import { Checkbox, Stack } from "@phsa.tec/design-system-react/react";

export default function CheckboxStates() {
  return (
    <Stack gap="sm">
      <Checkbox label="Desabilitado" disabled />
      <Checkbox label="Marcado e desabilitado" checked disabled />
      <Checkbox label="Li e aceito a política de privacidade" error="Aceite a política para continuar." />
    </Stack>
  );
}
