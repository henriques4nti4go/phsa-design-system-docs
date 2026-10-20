/**
 * @title Controlado
 * @description Leia `checked` no `onChange` para guardar o estado; aqui o botão só libera depois do aceite.
 */
"use client";

import { useState } from "react";
import { Button, Checkbox, Stack } from "@phsa.tec/design-system-react/react";

export default function CheckboxControlled() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Stack gap="md" align="center">
      <Checkbox
        label="Aceito os termos de uso"
        checked={accepted}
        onChange={(e) => setAccepted((e.target as HTMLInputElement).checked)}
      />
      <Button disabled={!accepted}>Criar conta</Button>
    </Stack>
  );
}
