/**
 * @title Confirmação
 * @description Pede uma decisão antes de seguir: `onPhsaConfirm` dispara no botão principal e `onClose` em qualquer fechamento.
 */
"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function AlertDialogBasic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Publicar artigo
      </Button>

      <AlertDialog
        open={open}
        heading="Publicar agora?"
        description="O artigo fica visível para todos os leitores e é enviado na newsletter."
        confirmLabel="Publicar"
        cancelLabel="Agora não"
        onPhsaConfirm={() => toast.success("Artigo publicado")}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
