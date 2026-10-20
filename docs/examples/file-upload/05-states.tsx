/**
 * @title Estados
 * @description `error` destaca a área e mostra a mensagem; `disabled` bloqueia a seleção e o arrastar e soltar.
 */
"use client";

import { FileUpload, Stack } from "@phsa.tec/design-system-react/react";

export default function FileUploadStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <FileUpload label="RG ou CNH" error="Envie uma foto do documento." />
      <FileUpload label="Contrato assinado" disabled />
    </Stack>
  );
}
