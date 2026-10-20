/**
 * @title Oculto
 * @description `mask` esconde os caracteres como em um campo de senha.
 */
"use client";

import { OtpInput, Stack } from "@phsa.tec/design-system-react/react";

export default function OtpInputMask() {
  return (
    <Stack maxWidth="sm" gap="md">
      <OtpInput label="Senha de 6 dígitos" mask value="482913" />
    </Stack>
  );
}
