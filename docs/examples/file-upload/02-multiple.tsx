/**
 * @title Vários arquivos
 * @description `multiple` aceita mais de um arquivo e `accept` filtra os tipos, inclusive no arrastar e soltar.
 */
"use client";

import { FileUpload, Stack } from "@phsa.tec/design-system-react/react";

export default function FileUploadMultiple() {
  return (
    <Stack maxWidth="sm" gap="md">
      <FileUpload
        label="Fotos do imóvel"
        description="JPG ou PNG, quantas quiser."
        accept="image/png,image/jpeg"
        multiple
      />
    </Stack>
  );
}
