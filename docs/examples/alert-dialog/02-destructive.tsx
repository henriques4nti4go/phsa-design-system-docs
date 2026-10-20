/**
 * @title Destrutivo
 * @description `variant="destructive"` deixa o botão de confirmar vermelho, para ações que não têm volta; `onPhsaCancel` avisa quando a pessoa desiste.
 */
"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function AlertDialogDestructive() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" variant="destructive" onClick={() => setOpen(true)}>
        Excluir conta
      </Button>

      <AlertDialog
        open={open}
        variant="destructive"
        heading="Excluir sua conta?"
        description="Todos os pedidos, endereços e cartões salvos serão apagados. Essa ação não pode ser desfeita."
        confirmLabel="Excluir conta"
        onPhsaConfirm={() => toast("Conta excluída")}
        onPhsaCancel={() => toast("Nada foi excluído")}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
