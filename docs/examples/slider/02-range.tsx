/**
 * @title Limites e passo
 * @description `min`, `max` e `step` definem a escala, como em um `<input type="range">`.
 */
"use client";

import { Slider, Stack } from "@phsa.tec/design-system-react/react";

export default function SliderRange() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Slider label="Parcelas" min={1} max={12} value="6" showValue />
      <Slider label="Desconto (%)" min={0} max={50} step={5} value="15" showValue />
    </Stack>
  );
}
