/**
 * @title Título com conteúdo
 * @description Quando o título precisa de mais que texto, use os slots `title` e `description` no lugar dos atributos.
 */
"use client";

import { Badge, Button, Card, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function CardTitleSlot() {
  return (
    <Stack maxWidth="sm">
      <Card>
        <Stack slot="title" direction="row" gap="sm" align="center">
          Plano Profissional
          <Badge variant="success">Atual</Badge>
        </Stack>
        <Text slot="description" tone="muted">
          Renova em 05/11/2026
        </Text>
        <Stack gap="xs">
          <Text variant="h2">R$ 89,90</Text>
          <Text variant="small" tone="muted">por mês, cobrado no cartão final 4242</Text>
        </Stack>
        <Button slot="footer" variant="outline" block>
          Gerenciar assinatura
        </Button>
      </Card>
    </Stack>
  );
}
