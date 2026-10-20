/**
 * @title Filtro de preço
 * @description Separe o `value` em `/` para obter as duas extremidades; `step` controla o salto de cada uma.
 */
"use client";

import { useState } from "react";
import { RangeSlider, Stack, Text } from "@phsa.tec/design-system-react/react";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function RangeSliderControlled() {
  const [price, setPrice] = useState("200/800");

  const [min, max] = price.split("/").map(Number);

  return (
    <Stack maxWidth="sm" gap="sm">
      <RangeSlider
        label="Faixa de preço"
        min={0}
        max={1500}
        step={50}
        value={price}
        onInput={(e) => setPrice((e.target as HTMLInputElement).value)}
      />
      <Text variant="small" tone="muted">
        De {brl.format(min)} até {brl.format(max)}
      </Text>
    </Stack>
  );
}
