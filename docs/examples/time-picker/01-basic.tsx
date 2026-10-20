/**
 * @title Horário
 * @description Usa o seletor nativo do navegador; o `value` vem no formato `HH:mm`.
 */
"use client";

import { Stack, TimePicker } from "@phsa.tec/design-system-react/react";

export default function TimePickerBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <TimePicker label="Horário da consulta" value="14:30" />
      <TimePicker label="Lembrete" description="Enviaremos uma notificação neste horário." />
    </Stack>
  );
}
