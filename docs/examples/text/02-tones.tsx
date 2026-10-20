/**
 * @title Tons
 * @description `tone` aplica a cor do tema; sem ele, o texto herda a cor do contêiner.
 */
"use client";

import { Stack, Text } from "@phsa.tec/design-system-react/react";

export default function TextTones() {
  return (
    <Stack gap="xs" align="center">
      <Text tone="default">Saldo disponível em conta</Text>
      <Text tone="muted">Atualizado há 5 minutos</Text>
      <Text tone="primary">Ver extrato completo</Text>
      <Text tone="success">Pagamento confirmado</Text>
      <Text tone="warning">Boleto vence amanhã</Text>
      <Text tone="destructive">Cartão recusado</Text>
      <Text tone="info">Nova fatura disponível</Text>
    </Stack>
  );
}
