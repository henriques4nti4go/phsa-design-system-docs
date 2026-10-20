/**
 * @title Básico
 * @description Clique em uma estrela ou use as setas do teclado; o `value` vai de `0` (sem nota) até `max`.
 */
"use client";

import { Rating, Stack } from "@phsa.tec/design-system-react/react";

export default function RatingBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Rating label="Como foi a entrega?" />
      <Rating label="Atendimento" value="4" />
    </Stack>
  );
}
