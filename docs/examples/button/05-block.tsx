/**
 * @title Largura total
 * @description `block` faz o botão ocupar toda a largura do contêiner, comum em formulários e no celular.
 */
"use client";

import { Button, Stack } from "@phsa.tec/design-system-react/react";

export default function ButtonBlock() {
  return (
    <Stack maxWidth="sm" gap="sm">
      <Button block>Continuar</Button>
      <Button block variant="outline" disabled>
        Desabilitado
      </Button>
    </Stack>
  );
}
