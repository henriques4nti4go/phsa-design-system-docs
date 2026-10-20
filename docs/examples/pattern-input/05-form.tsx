/**
 * @title Em formulário
 * @description Com `name` e `required`, o campo participa do `FormData` e da validação nativa do `<form>`.
 */
"use client";

import { useState, type FormEvent } from "react";
import { Button, PatternInput, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function PatternInputForm() {
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSent(`cpf=${data.get("cpf")} · cep=${data.get("cep")}`);
  };

  return (
    <form onSubmit={submit} onReset={() => setSent("")}>
      <Stack maxWidth="sm" gap="md">
        <PatternInput name="cpf" label="CPF" format="###.###.###-##" placeholder="000.000.000-00" required />
        <PatternInput name="cep" label="CEP" format="#####-###" placeholder="00000-000" required />
        <Stack direction="row" gap="sm">
          <Button type="submit">Enviar</Button>
          <Button type="reset" variant="outline">
            Limpar
          </Button>
        </Stack>
        {sent && <Text variant="small" tone="muted">{sent}</Text>}
      </Stack>
    </form>
  );
}
