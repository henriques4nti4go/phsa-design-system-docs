/**
 * @title Em formulário
 * @description Como o `Checkbox`: ligado envia `value` com o seu `name`, desligado não entra no `FormData`.
 */
"use client";

import { useState, type FormEvent } from "react";
import { Button, Stack, Switch, Text } from "@phsa.tec/design-system-react/react";

export default function SwitchForm() {
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSent(data.getAll("canais").join(", ") || "nenhum canal");
  };

  return (
    <Stack gap="md">
      <form onSubmit={submit}>
        <Stack gap="md">
          <Switch name="canais" value="email" label="E-mail" />
          <Switch name="canais" value="sms" label="SMS" />
          <Switch name="canais" value="whatsapp" label="WhatsApp" />
          <Button type="submit">Salvar preferências</Button>
        </Stack>
      </form>
      {sent && <Text tone="muted">Enviado: {sent}</Text>}
    </Stack>
  );
}
