/**
 * @title Em formulário
 * @description Com `name`, os arquivos vão no `FormData`; `required` impede o envio sem arquivo e o reset do `<form>` limpa a lista.
 */
"use client";

import { useState, type FormEvent } from "react";
import { Button, FileUpload, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function FileUploadForm() {
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = new FormData(e.currentTarget).getAll("anexos") as File[];
    setSent(`Enviado: ${files.map((file) => file.name).join(", ")}`);
  };

  return (
    <form onSubmit={submit} onReset={() => setSent("")}>
      <Stack maxWidth="sm" gap="md">
        <FileUpload name="anexos" label="Anexos do chamado" multiple required />
        <Stack direction="row" gap="sm">
          <Button type="submit">Abrir chamado</Button>
          <Button type="reset" variant="outline">
            Limpar
          </Button>
        </Stack>
        {sent && <Text variant="small" tone="muted">{sent}</Text>}
      </Stack>
    </form>
  );
}
