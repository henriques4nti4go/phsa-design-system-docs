/**
 * @title Com texto
 * @description `label` coloca um texto no meio da linha, como o “ou” entre duas formas de entrar.
 */
"use client";

import { Button, Separator, Stack } from "@phsa.tec/design-system-react/react";

export default function SeparatorLabel() {
  return (
    <Stack maxWidth="xs" gap="md">
      <Button block>Entrar com e-mail</Button>
      <Separator label="ou" />
      <Button block variant="outline">
        Entrar com gov.br
      </Button>
    </Stack>
  );
}
