/**
 * @title Controlado
 * @description Passe `open` e acompanhe `onPhsaToggle` (`detail.open`) para fechar o painel pelo código, como depois de salvar.
 */
"use client";

import { useState } from "react";
import { Button, Popover, Stack, Textarea } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function PopoverControlled() {
  const [open, setOpen] = useState(false);

  const send = () => {
    setOpen(false);
    toast.success("Obrigado pelo feedback!");
  };

  return (
    <Popover open={open} onPhsaToggle={(e) => setOpen((e as CustomEvent<{ open: boolean }>).detail.open)}>
      <Button slot="trigger" type="button">
        Enviar feedback
      </Button>
      <Stack gap="sm">
        <Textarea label="O que podemos melhorar?" rows={3} />
        <Stack direction="row" justify="end">
          <Button type="button" size="sm" onClick={send}>
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
}
