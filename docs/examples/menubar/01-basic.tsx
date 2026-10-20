/**
 * @title Básico
 * @description Cada `MenubarMenu` tem um `label` e itens `DropdownItem`; `onPhsaSelect` recebe o `value` do item em `detail.value`.
 */
"use client";

import { useState } from "react";
import { DropdownItem, DropdownSeparator, Menubar, MenubarMenu, Stack, Text } from "@phsa.tec/design-system-react/react";

const valueOf = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;

export default function MenubarBasic() {
  const [action, setAction] = useState("");
  const select = (e: Event) => setAction(valueOf(e));

  return (
    <Stack gap="md" align="center">
      <Menubar label="Editor de documentos">
        <MenubarMenu label="Arquivo" onPhsaSelect={select}>
          <DropdownItem value="novo">Novo documento</DropdownItem>
          <DropdownItem value="abrir">Abrir…</DropdownItem>
          <DropdownSeparator />
          <DropdownItem value="exportar-pdf">Exportar como PDF</DropdownItem>
        </MenubarMenu>
        <MenubarMenu label="Editar" onPhsaSelect={select}>
          <DropdownItem value="desfazer">Desfazer</DropdownItem>
          <DropdownItem value="refazer">Refazer</DropdownItem>
          <DropdownSeparator />
          <DropdownItem value="copiar">Copiar</DropdownItem>
          <DropdownItem value="colar">Colar</DropdownItem>
        </MenubarMenu>
        <MenubarMenu label="Ajuda" onPhsaSelect={select}>
          <DropdownItem value="atalhos">Atalhos de teclado</DropdownItem>
          <DropdownItem value="suporte">Falar com o suporte</DropdownItem>
        </MenubarMenu>
      </Menubar>
      <Text tone="muted">{action ? `Ação escolhida: ${action}` : "Escolha uma ação no menu."}</Text>
    </Stack>
  );
}
