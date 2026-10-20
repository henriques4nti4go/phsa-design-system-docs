/**
 * @title Básico
 * @description `heading` e `description` montam o cabeçalho; os filhos viram o corpo do card.
 */
"use client";

import { Card, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function CardBasic() {
  return (
    <Stack maxWidth="sm">
      <Card heading="Entrega prevista" description="Pedido #1042 · Correios SEDEX">
        <Text>
          Seu pedido saiu do centro de distribuição em Cajamar (SP) e deve chegar até
          quinta-feira, 23 de outubro.
        </Text>
      </Card>
    </Stack>
  );
}
