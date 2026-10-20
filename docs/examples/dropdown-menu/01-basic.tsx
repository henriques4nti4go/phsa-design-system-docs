/**
 * @title Básico
 * @description `onPhsaSelect` recebe o `value` do item em `detail.value`; use `DropdownSeparator` para agrupar e `variant="destructive"` nas ações perigosas.
 */
"use client";

import { Button, DropdownItem, DropdownMenu, DropdownSeparator } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function DropdownMenuBasic() {
  const select = (e: Event) => toast(`Ação: ${(e as CustomEvent<{ value: string }>).detail.value}`);

  return (
    <DropdownMenu onPhsaSelect={select}>
      <Button slot="trigger" type="button" variant="outline">
        Opções do pedido
      </Button>
      <DropdownItem value="detalhes">Ver detalhes</DropdownItem>
      <DropdownItem value="nota">Baixar nota fiscal</DropdownItem>
      <DropdownItem value="rastrear">Rastrear entrega</DropdownItem>
      <DropdownSeparator />
      <DropdownItem value="cancelar" variant="destructive">
        Cancelar pedido
      </DropdownItem>
    </DropdownMenu>
  );
}
