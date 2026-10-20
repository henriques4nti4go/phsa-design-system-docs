/**
 * @title Variantes
 * @description Chame `toast()` ou os atalhos `toast.success`, `toast.error`, `toast.warning` e `toast.info`; o app precisa de um único `<Toaster />`, normalmente no layout.
 */
"use client";

import { Button, Stack } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

// Uma vez no layout do app:
// <Toaster position="bottom-right" />

export default function ToastVariants() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      <Button type="button" variant="outline" onClick={() => toast("Rascunho salvo")}>
        Padrão
      </Button>
      <Button type="button" variant="outline" onClick={() => toast.success("Pedido enviado")}>
        Sucesso
      </Button>
      <Button type="button" variant="outline" onClick={() => toast.info("Nova versão disponível")}>
        Informação
      </Button>
      <Button type="button" variant="outline" onClick={() => toast.warning("Estoque baixo")}>
        Aviso
      </Button>
      <Button type="button" variant="outline" onClick={() => toast.error("Cartão recusado")}>
        Erro
      </Button>
    </Stack>
  );
}
