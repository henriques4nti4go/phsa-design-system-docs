/**
 * @title Em formulário
 * @description Com `name` o valor entra no `FormData`; `required`, `type="email"` e `minLength` usam a validação do navegador e mostram o erro após o envio.
 */
"use client";

import { useState, type FormEvent } from "react";
import { Button, Input, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function InputForm() {
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSent(`${data.get("nome")} <${data.get("email")}>`);
  };

  return (
    <Stack maxWidth="sm" gap="md">
      <form onSubmit={submit}>
        <Stack gap="md">
          <Input name="nome" label="Nome" placeholder="Ana Souza" minLength={3} required />
          <Input name="email" type="email" label="E-mail" placeholder="ana@exemplo.com" required />
          <Button type="submit">Enviar</Button>
        </Stack>
      </form>
      {sent && <Text tone="muted">Enviado: {sent}</Text>}
    </Stack>
  );
}
