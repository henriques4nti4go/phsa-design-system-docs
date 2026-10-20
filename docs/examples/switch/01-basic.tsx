/**
 * @title Básico
 * @description Use o `Switch` para ligar e desligar algo que vale na hora, sem botão de salvar.
 */
"use client";

import { Stack, Switch } from "@phsa.tec/design-system-react/react";

export default function SwitchBasic() {
  return (
    <Stack gap="md">
      <Switch label="Modo avião" />
      <Switch label="Notificações" checked description="Avisos de pedidos e entregas." />
    </Stack>
  );
}
