/**
 * @title Rótulos acessíveis e estados
 * @description `lower-label` e `upper-label` nomeiam cada controle para leitores de tela; `disabled` bloqueia os dois.
 */
"use client";

import { RangeSlider, Stack } from "@phsa.tec/design-system-react/react";

export default function RangeSliderLabels() {
  return (
    <Stack maxWidth="sm" gap="md">
      <RangeSlider
        label="Área do imóvel (m²)"
        min={20}
        max={300}
        step={10}
        value="60/120"
        lowerLabel="Área mínima"
        upperLabel="Área máxima"
        showValues
      />
      <RangeSlider label="Quartos" min={1} max={5} value="2/3" showValues disabled />
    </Stack>
  );
}
