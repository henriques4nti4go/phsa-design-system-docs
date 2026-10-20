/**
 * @title Inteiros, sufixo e sinal
 * @description `decimalScale={0}` aceita só inteiros, `suffix` vai depois do número e `allowNegative={false}` bloqueia o sinal de menos.
 */
"use client";

import { NumericInput, Stack } from "@phsa.tec/design-system-react/react";

export default function NumericInputFormats() {
  return (
    <Stack maxWidth="sm" gap="md">
      <NumericInput label="Quantidade" decimalScale={0} allowNegative={false} suffix=" un." placeholder="0 un." />
      <NumericInput label="Desconto" decimalScale={1} allowNegative={false} suffix="%" placeholder="0%" />
      <NumericInput label="Variação de temperatura" decimalScale={1} suffix=" °C" placeholder="-2,5 °C" />
    </Stack>
  );
}
