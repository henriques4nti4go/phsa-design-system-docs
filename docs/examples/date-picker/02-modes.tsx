/**
 * @title Intervalo e várias datas
 * @description `mode="range"` escolhe início e fim (`início/fim`); `mode="multiple"` junta dias soltos separados por vírgula.
 */
"use client";

import { DatePicker, Stack } from "@phsa.tec/design-system-react/react";

export default function DatePickerModes() {
  return (
    <Stack maxWidth="sm" gap="md">
      <DatePicker label="Férias" mode="range" value="2026-12-21/2027-01-04" />
      <DatePicker label="Plantões" mode="multiple" value="2026-10-24,2026-10-31,2026-11-07" />
    </Stack>
  );
}
