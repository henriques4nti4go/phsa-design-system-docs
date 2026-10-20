/**
 * @title Valor sem máscara
 * @description O `value` (e o `<form>`) recebe só os caracteres digitados, sem a pontuação do `format`.
 */
"use client";

import { useState } from "react";
import { PatternInput, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function PatternInputControlled() {
  const [phone, setPhone] = useState("11987654321");

  return (
    <Stack maxWidth="sm" gap="sm">
      <PatternInput
        label="Celular"
        format="(##) #####-####"
        placeholder="(00) 00000-0000"
        value={phone}
        onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
      />
      <Text variant="small" tone="muted">
        value: {phone || "(vazio)"}
      </Text>
    </Stack>
  );
}
