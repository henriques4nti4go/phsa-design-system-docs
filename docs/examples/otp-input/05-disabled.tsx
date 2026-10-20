/**
 * @title Desabilitado
 * @description `disabled` bloqueia todas as células, por exemplo enquanto o código é reenviado.
 */
"use client";

import { OtpInput, Stack } from "@phsa.tec/design-system-react/react";

export default function OtpInputDisabled() {
  return (
    <Stack maxWidth="sm" gap="md">
      <OtpInput label="Código de verificação" description="Reenviando o SMS…" disabled />
    </Stack>
  );
}
