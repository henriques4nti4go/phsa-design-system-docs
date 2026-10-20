/**
 * @title Limites em formulário
 * @description `min` e `max` são validados no envio, com mensagem em português; o `FormData` recebe o número sem formatação.
 */
"use client";

import { useState, type FormEvent } from "react";
import { Button, NumericInput, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function NumericInputForm() {
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(String(new FormData(e.currentTarget).get("parcela")));
  };

  return (
    <Stack maxWidth="sm" gap="md">
      <form onSubmit={submit}>
        <Stack gap="md">
          <NumericInput
            name="parcela"
            label="Valor da parcela"
            description="Entre R$ 100,00 e R$ 5.000,00."
            prefix="R$ "
            decimalScale={2}
            min="100"
            max="5000"
            required
          />
          <Button type="submit">Simular</Button>
        </Stack>
      </form>
      {sent && <Text tone="muted">Enviado: {sent}</Text>}
    </Stack>
  );
}
