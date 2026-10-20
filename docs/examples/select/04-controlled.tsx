/**
 * @title Controlado
 * @description `onChange` dispara a cada escolha; leia o `value` do alvo para guardar no estado.
 */
"use client";

import { useState } from "react";
import { Select, Stack, Text } from "@phsa.tec/design-system-react/react";

const fees: Record<string, string> = { sedex: "R$ 32,50", pac: "R$ 18,90", retirada: "Grátis" };

export default function SelectControlled() {
  const [shipping, setShipping] = useState("pac");

  return (
    <Stack maxWidth="sm" gap="sm">
      <Select
        label="Frete"
        value={shipping}
        onChange={(e) => setShipping((e.target as HTMLSelectElement).value)}
      >
        <option value="sedex">Sedex (2 dias úteis)</option>
        <option value="pac">PAC (7 dias úteis)</option>
        <option value="retirada">Retirar na loja</option>
      </Select>
      <Text weight="medium">Frete: {fees[shipping]}</Text>
    </Stack>
  );
}
