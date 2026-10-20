/**
 * @title Controlado
 * @description O grupo dispara `onChange` com o novo `value`; guarde no estado para reagir à escolha.
 */
"use client";

import { useState } from "react";
import { Radio, RadioGroup, Stack, Text } from "@phsa.tec/design-system-react/react";

const prices: Record<string, string> = { mensal: "R$ 39,90 por mês", anual: "R$ 399,00 por ano (2 meses grátis)" };

export default function RadioGroupControlled() {
  const [plan, setPlan] = useState("mensal");

  return (
    <Stack gap="md" align="center">
      <RadioGroup
        label="Cobrança"
        orientation="horizontal"
        value={plan}
        onChange={(e) => setPlan((e.target as HTMLInputElement).value)}
      >
        <Radio value="mensal">Mensal</Radio>
        <Radio value="anual">Anual</Radio>
      </RadioGroup>
      <Text weight="medium">{prices[plan]}</Text>
    </Stack>
  );
}
