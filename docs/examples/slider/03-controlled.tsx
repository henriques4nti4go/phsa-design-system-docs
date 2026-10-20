/**
 * @title Controlado
 * @description O `onInput` dispara enquanto o controle se move; o `value` chega como texto.
 */
"use client";

import { useState } from "react";
import { Slider, Stack, Text } from "@phsa.tec/design-system-react/react";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function SliderControlled() {
  const [amount, setAmount] = useState("5000");

  return (
    <Stack maxWidth="sm" gap="sm">
      <Slider
        label="Valor do empréstimo"
        min={1000}
        max={20000}
        step={500}
        value={amount}
        onInput={(e) => setAmount((e.target as HTMLInputElement).value)}
      />
      <Text variant="h4">{brl.format(Number(amount))}</Text>
      <Text variant="small" tone="muted">
        Em 12x de {brl.format((Number(amount) * 1.2) / 12)}
      </Text>
    </Stack>
  );
}
