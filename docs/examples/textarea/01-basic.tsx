/**
 * @title Básico
 * @description `rows` define a altura inicial; o usuário ainda pode redimensionar na vertical.
 */
"use client";

import { Stack, Textarea } from "@phsa.tec/design-system-react/react";

export default function TextareaBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Textarea
        label="Observações da entrega"
        placeholder="Ex.: deixar com o porteiro, bloco B"
        description="Opcional. Aparece na etiqueta do pedido."
        rows={4}
      />
    </Stack>
  );
}
