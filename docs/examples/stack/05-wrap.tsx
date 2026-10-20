/**
 * @title Quebra de linha
 * @description Com `wrap`, os itens de um stack em linha passam para a linha de baixo quando não cabem.
 */
"use client";

import { Badge, Stack } from "@phsa.tec/design-system-react/react";

const tags = ["Frete grátis", "Pix", "Parcelamento em 12x", "Retirada na loja", "Garantia estendida", "Nota fiscal", "Troca em 30 dias"];

export default function StackWrap() {
  return (
    <Stack maxWidth="sm" direction="row" gap="sm" wrap>
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </Stack>
  );
}
