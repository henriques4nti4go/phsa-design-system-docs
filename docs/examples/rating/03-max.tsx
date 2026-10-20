/**
 * @title Escala
 * @description `max` muda a quantidade de estrelas.
 */
"use client";

import { Rating, Stack } from "@phsa.tec/design-system-react/react";

export default function RatingMax() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Rating label="Dificuldade" max={3} value="2" />
      <Rating label="Nota do filme" max={10} value="7" />
    </Stack>
  );
}
