/**
 * @title Dispensável
 * @description `dismissible` mostra o botão de fechar; o alerta se esconde sozinho e dispara `onDismiss`.
 */
"use client";

import { useState } from "react";
import { Alert, Button, Stack } from "@phsa.tec/design-system-react/react";

export default function AlertDismissible() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Button type="button" variant="outline" onClick={() => setVisible(true)}>
        Mostrar o aviso de novo
      </Button>
    );
  }

  return (
    <Stack maxWidth="md">
      <Alert
        variant="info"
        heading="Complete seu cadastro"
        description="Falta informar o CPF para emitir notas fiscais."
        dismissible
        onDismiss={() => setVisible(false)}
      />
    </Stack>
  );
}
