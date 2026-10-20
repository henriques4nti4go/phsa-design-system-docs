/**
 * @title Básico
 * @description `show-value` mostra o valor atual ao lado do trilho; o padrão vai de `0` a `100`.
 */
"use client";

import { Slider, Stack } from "@phsa.tec/design-system-react/react";

export default function SliderBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Slider label="Volume" value="60" showValue />
      <Slider label="Brilho" value="35" />
    </Stack>
  );
}
