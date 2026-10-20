/**
 * @title Básico
 * @description Clique com o botão direito (ou Shift+F10 com o foco) na área com `slot="trigger"`; o menu abre onde o ponteiro está.
 */
"use client";

import { ContextMenu, DropdownItem, DropdownSeparator, Stack, Text } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function ContextMenuBasic() {
  const select = (e: Event) => toast(`Ação: ${(e as CustomEvent<{ value: string }>).detail.value}`);

  return (
    <ContextMenu onPhsaSelect={select}>
      <Stack slot="trigger" tabIndex={0} maxWidth="sm" padding="2xl" bordered radius="lg" align="center">
        <Text tone="muted">Clique com o botão direito aqui</Text>
      </Stack>
      <DropdownItem value="voltar">Voltar</DropdownItem>
      <DropdownItem value="recarregar">Recarregar</DropdownItem>
      <DropdownItem value="salvar">Salvar como…</DropdownItem>
      <DropdownSeparator />
      <DropdownItem value="inspecionar">Inspecionar</DropdownItem>
    </ContextMenu>
  );
}
