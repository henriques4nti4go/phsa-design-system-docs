/**
 * @title Controlado
 * @description Leia o `value` no `onInput` para usar o horário escolhido em outras partes da tela.
 */
"use client";

import { useState } from "react";
import { Grid, Stack, Text, TimePicker } from "@phsa.tec/design-system-react/react";

export default function TimePickerControlled() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("18:00");

  return (
    <Stack maxWidth="sm" gap="sm">
      <Grid columns={2} gap="md">
        <TimePicker label="Entrada" value={start} onInput={(e) => setStart((e.target as HTMLInputElement).value)} />
        <TimePicker label="Saída" value={end} min={start} onInput={(e) => setEnd((e.target as HTMLInputElement).value)} />
      </Grid>
      <Text variant="small" tone="muted">
        Expediente: {start || "--:--"} às {end || "--:--"}
      </Text>
    </Stack>
  );
}
