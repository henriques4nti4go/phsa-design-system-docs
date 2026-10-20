/**
 * @title Contagem
 * @description Um `Badge` ao lado do texto mostra quantos itens há numa seção ou num botão.
 */
"use client";

import { Badge, Button, Stack } from "@phsa.tec/design-system-react/react";

export default function BadgeCount() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      <Button variant="outline">
        Caixa de entrada
        <Badge variant="secondary">12</Badge>
      </Button>
      <Button variant="outline">
        Pendências
        <Badge variant="destructive">3</Badge>
      </Button>
    </Stack>
  );
}
