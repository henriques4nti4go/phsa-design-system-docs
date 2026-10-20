/**
 * @title Duração
 * @description `duration` é em milissegundos (padrão 4000); `0` mantém o toast até ser fechado ou até `dismissToast(id)`.
 */
"use client";

import { useState } from "react";
import { Button, Stack } from "@phsa.tec/design-system-react/react";
import { dismissToast, toast } from "@phsa.tec/design-system-react/toast";

export default function ToastDuration() {
  const [id, setId] = useState<number | null>(null);

  const startUpload = () => setId(toast.info("Enviando arquivos…", { description: "3 de 12 concluídos", duration: 0 }));

  const finishUpload = () => {
    if (id !== null) dismissToast(id);
    setId(null);
    toast.success("Upload concluído", { duration: 2000 });
  };

  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      <Button type="button" variant="outline" disabled={id !== null} onClick={startUpload}>
        Iniciar upload
      </Button>
      <Button type="button" disabled={id === null} onClick={finishUpload}>
        Concluir
      </Button>
    </Stack>
  );
}
