/**
 * @title Estados
 * @description `size` muda a altura; `error`, `readOnly` e `disabled` funcionam como nos outros campos.
 */
"use client";

import { Stack, TimePicker } from "@phsa.tec/design-system-react/react";

export default function TimePickerStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <TimePicker label="Pequeno" size="sm" value="07:15" />
      <TimePicker label="Grande" size="lg" value="07:15" />
      <TimePicker label="Início do turno" required error="Informe o horário de início." />
      <TimePicker label="Fechamento" value="22:00" readOnly />
      <TimePicker label="Abertura" value="06:00" disabled />
    </Stack>
  );
}
