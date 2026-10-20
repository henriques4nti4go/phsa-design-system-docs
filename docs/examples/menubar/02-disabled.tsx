/**
 * @title Desabilitados e destrutivos
 * @description `disabled` vale para um menu inteiro ou para um item; `variant="destructive"` destaca ações perigosas.
 */
"use client";

import { DropdownItem, DropdownSeparator, Menubar, MenubarMenu } from "@phsa.tec/design-system-react/react";

export default function MenubarDisabled() {
  return (
    <Menubar>
      <MenubarMenu label="Projeto">
        <DropdownItem value="renomear">Renomear</DropdownItem>
        <DropdownItem value="duplicar" disabled>
          Duplicar (limite do plano)
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem value="excluir" variant="destructive">
          Excluir projeto
        </DropdownItem>
      </MenubarMenu>
      <MenubarMenu label="Equipe" disabled>
        <DropdownItem value="convidar">Convidar pessoas</DropdownItem>
      </MenubarMenu>
      <MenubarMenu label="Exibir">
        <DropdownItem value="tela-cheia">Tela cheia</DropdownItem>
      </MenubarMenu>
    </Menubar>
  );
}
