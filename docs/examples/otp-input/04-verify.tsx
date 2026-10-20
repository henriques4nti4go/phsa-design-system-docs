/**
 * @title Verificação automática
 * @description O `onChange` só dispara quando todas as células estão preenchidas, o momento certo para validar o código.
 */
"use client";

import { useState } from "react";
import { OtpInput, Stack, Text } from "@phsa.tec/design-system-react/react";

const EXPECTED = "123456";

export default function OtpInputVerify() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  return (
    <Stack maxWidth="sm" gap="sm">
      <OtpInput
        label="Código de acesso"
        description={`Para testar, use ${EXPECTED}.`}
        error={status === "error" ? "Código incorreto. Tente novamente." : ""}
        onInput={() => setStatus("idle")}
        onChange={(e) => setStatus((e.target as HTMLInputElement).value === EXPECTED ? "ok" : "error")}
      />
      {status === "ok" && <Text tone="success">Código confirmado!</Text>}
    </Stack>
  );
}
