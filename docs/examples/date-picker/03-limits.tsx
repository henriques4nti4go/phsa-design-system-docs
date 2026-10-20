/**
 * @title Datas bloqueadas
 * @description `min` e `max` limitam o calendário e `disabled-dates` bloqueia dias específicos, como feriados.
 */
"use client";

import { DatePicker, Stack } from "@phsa.tec/design-system-react/react";

export default function DatePickerLimits() {
  return (
    <Stack maxWidth="sm" gap="md">
      <DatePicker
        label="Data de entrega"
        description="Só em novembro; feriados indisponíveis."
        min="2026-11-01"
        max="2026-11-30"
        disabledDates="2026-11-02,2026-11-15,2026-11-20"
      />
    </Stack>
  );
}
