/**
 * @title Data única
 * @description O modo padrão escolhe um dia; o `value` usa o formato `YYYY-MM-DD`.
 */
"use client";

import { DatePicker, Stack } from "@phsa.tec/design-system-react/react";

export default function DatePickerBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <DatePicker label="Data de nascimento" placeholder="Selecione uma data" />
      <DatePicker label="Data de admissão" value="2026-03-02" description="Primeiro dia útil na empresa." />
    </Stack>
  );
}
