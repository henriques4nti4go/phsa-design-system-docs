/**
 * @title Em um item
 * @description Use os mesmos `DropdownItem` do menu suspenso, com `disabled` e `variant="destructive"`, para ações sobre um arquivo.
 */
"use client";

import { useState } from "react";
import { ContextMenu, DropdownItem, DropdownSeparator, Icon, Stack, Text } from "@phsa.tec/design-system-react/react";
import { FileText } from "@phsa.tec/design-system-react/icons/file-text";

export default function ContextMenuFile() {
  const [last, setLast] = useState("nenhuma");

  return (
    <Stack gap="sm" align="center">
      <ContextMenu onPhsaSelect={(e) => setLast((e as CustomEvent<{ value: string }>).detail.value)}>
        <Stack slot="trigger" tabIndex={0} direction="row" gap="sm" align="center" padding="sm" bordered radius="md">
          <Icon icon={FileText} size="sm" tone="muted" />
          <Text>contrato-locacao.pdf</Text>
        </Stack>
        <DropdownItem value="abrir">Abrir</DropdownItem>
        <DropdownItem value="renomear">Renomear</DropdownItem>
        <DropdownItem value="compartilhar" disabled>
          Compartilhar
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem value="excluir" variant="destructive">
          Excluir
        </DropdownItem>
      </ContextMenu>
      <Text variant="small" tone="muted">
        Última ação: {last}
      </Text>
    </Stack>
  );
}
