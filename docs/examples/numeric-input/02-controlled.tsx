/**
 * @title Valor canônico
 * @description O campo mostra o número formatado, mas `value` (e o `<form>`) recebe a forma canônica, como `1234.5`, pronta para `Number()`.
 */
"use client";

import { useState } from "react";
import { NumericInput, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function NumericInputControlled() {
  const [salary, setSalary] = useState("4850.75");
  const yearly = (Number(salary) || 0) * 13;

  return (
    <Stack maxWidth="sm" gap="sm">
      <NumericInput
        label="Salário mensal"
        prefix="R$ "
        decimalScale={2}
        value={salary}
        onInput={(e) => setSalary((e.target as HTMLInputElement).value)}
      />
      <Text variant="small" tone="muted">
        value: &quot;{salary}&quot;
      </Text>
      <Text weight="medium">
        Por ano, com 13º: {yearly.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </Text>
    </Stack>
  );
}
