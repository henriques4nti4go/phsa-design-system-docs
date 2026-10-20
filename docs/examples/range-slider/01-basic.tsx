/**
 * @title Básico
 * @description O `value` usa o formato `mínimo/máximo`; `show-values` mostra as duas extremidades.
 */
"use client";

import { RangeSlider, Stack } from "@phsa.tec/design-system-react/react";

export default function RangeSliderBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <RangeSlider label="Idade" min={18} max={80} value="25/45" showValues />
    </Stack>
  );
}
