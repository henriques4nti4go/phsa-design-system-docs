/**
 * @title Estados
 * @description `disabled` bloqueia o interruptor; `error` mostra a mensagem logo abaixo.
 */
"use client";

import { Stack, Switch } from "@phsa.tec/design-system-react/react";

export default function SwitchStates() {
  return (
    <Stack gap="md">
      <Switch label="Desligado e desabilitado" disabled />
      <Switch label="Ligado e desabilitado" checked disabled />
      <Switch label="Cobrança automática" error="Cadastre um cartão para ativar." />
    </Stack>
  );
}
