/**
 * @title Horizontal
 * @description `orientation="horizontal"` coloca as opções lado a lado, bom para listas curtas.
 */
"use client";

import { Radio, RadioGroup } from "@phsa.tec/design-system-react/react";

export default function RadioGroupHorizontal() {
  return (
    <RadioGroup label="Tamanho" orientation="horizontal" value="m">
      <Radio value="p">P</Radio>
      <Radio value="m">M</Radio>
      <Radio value="g">G</Radio>
      <Radio value="gg">GG</Radio>
    </RadioGroup>
  );
}
