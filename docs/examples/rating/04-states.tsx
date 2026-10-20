/**
 * @title Somente leitura e desabilitado
 * @description `readOnly` exibe uma nota sem permitir alteração, como a média de um produto; `disabled` também esmaece.
 */
"use client";

import { Rating, Stack } from "@phsa.tec/design-system-react/react";

export default function RatingStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Rating label="Média de 1.284 avaliações" value="4" readOnly />
      <Rating label="Avaliação encerrada" value="2" disabled />
    </Stack>
  );
}
