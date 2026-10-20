/**
 * @title Básico
 * @description `heading` e `description` explicam por que não há nada; sem o slot `icon`, aparece o ícone de caixa vazia.
 */
"use client";

import { EmptyState, Stack } from "@phsa.tec/design-system-react/react";

export default function EmptyStateBasic() {
  return (
    <Stack maxWidth="xl">
      <EmptyState heading="Nenhuma notificação" description="Avisamos por aqui quando um pedido mudar de status." />
    </Stack>
  );
}
