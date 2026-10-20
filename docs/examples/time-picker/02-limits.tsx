/**
 * @title Limites e intervalo
 * @description `min` e `max` definem a faixa aceita; `step` é em segundos (`1800` = de 30 em 30 min, `1` mostra os segundos).
 */
"use client";

import { Stack, TimePicker } from "@phsa.tec/design-system-react/react";

export default function TimePickerLimits() {
  return (
    <Stack maxWidth="sm" gap="md">
      <TimePicker label="Retirada na loja" description="Das 08:00 às 18:00." min="08:00" max="18:00" step={1800} />
      <TimePicker label="Tempo da volta" step={1} value="00:01:42" />
    </Stack>
  );
}
