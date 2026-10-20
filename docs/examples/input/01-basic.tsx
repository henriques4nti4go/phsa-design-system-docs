/**
 * @title Básico
 * @description `label` fica acima do campo e `description` abaixo, já ligados ao campo para leitores de tela.
 */
"use client";

import { Input, Stack } from "@phsa.tec/design-system-react/react";

export default function InputBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Input label="Nome completo" placeholder="Maria da Silva" />
      <Input
        type="email"
        label="E-mail"
        placeholder="voce@exemplo.com"
        description="Usaremos só para enviar a nota fiscal."
      />
    </Stack>
  );
}
