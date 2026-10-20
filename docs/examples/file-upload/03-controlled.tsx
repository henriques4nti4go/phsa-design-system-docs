/**
 * @title Lendo os arquivos
 * @description A propriedade `files` traz os `File` escolhidos; leia no `onChange` para validar ou mostrar um resumo.
 */
"use client";

import { useState } from "react";
import { FileUpload, Stack, Text } from "@phsa.tec/design-system-react/react";
import type { PhsaFileUpload } from "@phsa.tec/design-system-react/file-upload";

const kb = (bytes: number) => `${Math.ceil(bytes / 1024)} KB`;

export default function FileUploadControlled() {
  const [files, setFiles] = useState<File[]>([]);

  const total = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <Stack maxWidth="sm" gap="sm">
      <FileUpload
        label="Documentos"
        multiple
        onChange={(e) => setFiles([...(e.target as PhsaFileUpload).files])}
      />
      <Text variant="small" tone="muted">
        {files.length ? `${files.length} arquivo(s), ${kb(total)} no total` : "Nenhum arquivo selecionado."}
      </Text>
    </Stack>
  );
}
