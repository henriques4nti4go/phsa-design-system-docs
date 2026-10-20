/**
 * @title Básico
 * @description Controle a janela com `open` e feche em `onClose`, que dispara no overlay, no Escape e no botão de fechar.
 */
"use client";

import { useState } from "react";
import { Button, Dialog, Input, Stack } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function DialogBasic() {
  const [open, setOpen] = useState(false);

  const save = () => {
    setOpen(false);
    toast.success("Endereço atualizado");
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Editar endereço
      </Button>

      <Dialog open={open} heading="Endereço de entrega" description="Usado nos próximos pedidos." onClose={() => setOpen(false)}>
        <Stack gap="md">
          <Input label="CEP" placeholder="00000-000" />
          <Input label="Rua" placeholder="Av. Paulista" />
          <Input label="Número" placeholder="1000" />
        </Stack>
        <Button slot="footer" type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button slot="footer" type="button" onClick={save}>
          Salvar
        </Button>
      </Dialog>
    </>
  );
}
