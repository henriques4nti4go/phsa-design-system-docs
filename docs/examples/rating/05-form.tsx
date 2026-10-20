/**
 * @title Em formulário
 * @description Com `name` e `required`, a nota vai no `FormData` e o envio é bloqueado enquanto ela for `0`.
 */
"use client";

import { useState, type FormEvent } from "react";
import { Button, Rating, Stack, Text, Textarea } from "@phsa.tec/design-system-react/react";

export default function RatingForm() {
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSent(`nota=${data.get("nota")} · comentario=${data.get("comentario") || "(vazio)"}`);
  };

  return (
    <form onSubmit={submit} onReset={() => setSent("")}>
      <Stack maxWidth="sm" gap="md">
        <Rating name="nota" label="Sua nota" required />
        <Textarea name="comentario" label="Comentário" placeholder="Conte como foi sua experiência" rows={3} />
        <Stack direction="row" gap="sm">
          <Button type="submit">Enviar avaliação</Button>
          <Button type="reset" variant="outline">
            Limpar
          </Button>
        </Stack>
        {sent && <Text variant="small" tone="muted">{sent}</Text>}
      </Stack>
    </form>
  );
}
