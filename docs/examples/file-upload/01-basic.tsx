/**
 * @title Básico
 * @description Clique para escolher ou arraste o arquivo para a área; `button-label` e `drop-label` trocam os textos.
 */
"use client";

import { FileUpload, Stack } from "@phsa.tec/design-system-react/react";

export default function FileUploadBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <FileUpload
        label="Comprovante de residência"
        buttonLabel="Selecionar comprovante"
        dropLabel="ou arraste o PDF aqui"
        accept=".pdf"
      />
    </Stack>
  );
}
