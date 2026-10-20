/**
 * @title Desabilitado
 * @description `disabled` mantém o valor visível mas impede a alteração.
 */
"use client";

import { Slider, Stack } from "@phsa.tec/design-system-react/react";

export default function SliderDisabled() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Slider label="Limite do cartão (%)" value="80" showValue disabled />
    </Stack>
  );
}
