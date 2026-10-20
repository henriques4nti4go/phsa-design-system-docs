/**
 * @title Estados
 * @description `required` participa da validação do `<form>`, `error` mostra a mensagem e `disabled` bloqueia o campo.
 */
"use client";

import { DatePicker, Stack } from "@phsa.tec/design-system-react/react";

export default function DatePickerStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <DatePicker label="Vencimento" required error="Informe a data de vencimento." />
      <DatePicker label="Data da compra" value="2026-10-05" disabled />
    </Stack>
  );
}
