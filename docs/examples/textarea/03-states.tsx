/**
 * @title Tamanhos e estados
 * @description `size` muda o espaçamento interno e a fonte; `disabled`, `readOnly` e `error` funcionam como no `Input`.
 */
"use client";

import { Stack, Textarea } from "@phsa.tec/design-system-react/react";

export default function TextareaStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Textarea size="sm" label="Pequeno" placeholder="Comentário rápido" rows={2} />
      <Textarea label="Somente leitura" value="Pedido revisado por Carlos Lima em 12/10/2026." readOnly rows={2} />
      <Textarea label="Desabilitado" value="Campo bloqueado após o envio." disabled rows={2} />
      <Textarea label="Motivo do cancelamento" error="Descreva o motivo para continuar." rows={2} />
    </Stack>
  );
}
