/**
 * @title Controlado
 * @description Guarde o valor no estado com `onInput`, que dispara a cada tecla; `onChange` só dispara ao sair do campo.
 */
"use client";

import { useState } from "react";
import { Input, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function InputControlled() {
  const [name, setName] = useState("");

  return (
    <Stack maxWidth="sm" gap="sm">
      <Input
        label="Como podemos te chamar?"
        placeholder="João"
        value={name}
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
      />
      <Text tone="muted">{name ? `Olá, ${name}!` : "Digite seu nome."}</Text>
    </Stack>
  );
}
