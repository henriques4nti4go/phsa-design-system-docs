/**
 * @title Tamanho e tipo
 * @description `length` define a quantidade de células e `type="alphanumeric"` aceita letras, sempre em maiúsculas.
 */
"use client";

import { OtpInput, Stack } from "@phsa.tec/design-system-react/react";

export default function OtpInputTypes() {
  return (
    <Stack maxWidth="sm" gap="md">
      <OtpInput label="PIN do cartão" length={4} />
      <OtpInput label="Código do cupom" type="alphanumeric" length={8} />
    </Stack>
  );
}
