/**
 * @title Básico
 * @description Seis dígitos por padrão; aceita digitação, colagem e o preenchimento automático do SMS.
 */
"use client";

import { OtpInput, Stack } from "@phsa.tec/design-system-react/react";

export default function OtpInputBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <OtpInput label="Código de verificação" description="Enviamos um SMS para (11) 98765-4321." />
    </Stack>
  );
}
