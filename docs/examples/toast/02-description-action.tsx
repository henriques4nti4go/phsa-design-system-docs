/**
 * @title Descrição e ação
 * @description `description` acrescenta uma linha de detalhe e `action` coloca um botão no toast, como o clássico "Desfazer".
 */
"use client";

import { Button } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function ToastDescriptionAction() {
  const archive = () =>
    toast("Conversa arquivada", {
      description: "Suporte — pedido #4821",
      action: { label: "Desfazer", onClick: () => toast.success("Conversa restaurada") },
    });

  return (
    <Button type="button" onClick={archive}>
      Arquivar conversa
    </Button>
  );
}
