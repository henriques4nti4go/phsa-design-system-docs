/**
 * @title Status em uma lista
 * @description Uso típico: o status de cada item ao lado do nome, com a cor indicando o estado.
 */
"use client";

import { Badge, Stack, Text } from "@phsa.tec/design-system-react/react";

const orders = [
  { id: "#1042", customer: "Mariana Costa", status: "Pago", variant: "success" },
  { id: "#1043", customer: "Rafael Souza", status: "Aguardando pagamento", variant: "warning" },
  { id: "#1044", customer: "Juliana Alves", status: "Enviado", variant: "info" },
  { id: "#1045", customer: "Pedro Oliveira", status: "Cancelado", variant: "destructive" },
] as const;

export default function BadgeStatus() {
  return (
    <Stack gap="sm" maxWidth="sm">
      {orders.map((order) => (
        <Stack key={order.id} direction="row" align="center" justify="between" gap="sm">
          <Stack gap="none">
            <Text weight="medium">Pedido {order.id}</Text>
            <Text variant="small" tone="muted">{order.customer}</Text>
          </Stack>
          <Badge variant={order.variant}>{order.status}</Badge>
        </Stack>
      ))}
    </Stack>
  );
}
