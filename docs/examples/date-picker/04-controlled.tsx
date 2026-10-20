/**
 * @title Controlado
 * @description Leia o `value` no `onInput` para reagir à escolha, aqui calculando a quantidade de noites.
 */
"use client";

import { useState } from "react";
import { DatePicker, Stack, Text } from "@phsa.tec/design-system-react/react";

const DAY = 24 * 60 * 60 * 1000;

export default function DatePickerControlled() {
  const [stay, setStay] = useState("2026-11-13/2026-11-16");

  const [from, to] = stay.split("/");
  const nights = from && to ? (Date.parse(to) - Date.parse(from)) / DAY : 0;

  return (
    <Stack maxWidth="sm" gap="sm">
      <DatePicker
        label="Hospedagem"
        mode="range"
        value={stay}
        onInput={(e) => setStay((e.target as HTMLInputElement).value)}
      />
      <Text variant="small" tone="muted">
        value: {stay || "(vazio)"} · {nights} noite(s)
      </Text>
    </Stack>
  );
}
