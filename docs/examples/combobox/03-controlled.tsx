/**
 * @title Controlado
 * @description `onChange` dispara quando uma opção é escolhida ou o campo é limpo; o alvo traz o `value` da opção, não o texto digitado.
 */
"use client";

import { useState } from "react";
import { Combobox, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function ComboboxControlled() {
  const [airport, setAirport] = useState("gru");

  return (
    <Stack maxWidth="sm" gap="sm">
      <Combobox
        label="Aeroporto de origem"
        value={airport}
        onChange={(e) => setAirport((e.target as HTMLInputElement).value)}
      >
        <option value="gru">Guarulhos (GRU)</option>
        <option value="cgh">Congonhas (CGH)</option>
        <option value="gig">Galeão (GIG)</option>
        <option value="sdu">Santos Dumont (SDU)</option>
        <option value="bsb">Brasília (BSB)</option>
        <option value="cnf">Confins (CNF)</option>
      </Combobox>
      <Text variant="small" tone="muted">
        value: &quot;{airport}&quot;
      </Text>
    </Stack>
  );
}
