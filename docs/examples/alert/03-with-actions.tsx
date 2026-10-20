/**
 * @title Com ações
 * @description O conteúdo filho entra abaixo da descrição, bom para botões que resolvem o aviso.
 */
"use client";

import { Alert, Button, Stack } from "@phsa.tec/design-system-react/react";

export default function AlertWithActions() {
  return (
    <Stack maxWidth="md">
      <Alert variant="warning" heading="Fatura em aberto" description="A fatura de outubro venceu há 3 dias. Regularize para evitar a suspensão.">
        <Stack direction="row" gap="sm" wrap>
          <Button size="sm">Pagar agora</Button>
          <Button size="sm" variant="outline">
            Ver fatura
          </Button>
        </Stack>
      </Alert>
    </Stack>
  );
}
