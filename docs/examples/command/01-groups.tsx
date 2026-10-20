/**
 * @title Grupos
 * @description `CommandGroup` agrupa os itens sob um `label` e `CommandSeparator` divide os grupos; a busca ignora acentos e `onPhsaSelect` traz o `detail.value`.
 */
"use client";

import { Command, CommandGroup, CommandItem, CommandSeparator, Stack } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function CommandGroups() {
  const select = (e: Event) => toast(`Abrindo: ${(e as CustomEvent<{ value: string }>).detail.value}`);

  return (
    <Stack maxWidth="sm">
      <Command placeholder="Buscar página ou ação…" onPhsaSelect={select}>
        <CommandGroup label="Páginas">
          <CommandItem value="painel">Painel</CommandItem>
          <CommandItem value="pedidos">Pedidos</CommandItem>
          <CommandItem value="clientes">Clientes</CommandItem>
          <CommandItem value="relatorios">Relatórios</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup label="Ações">
          <CommandItem value="novo-pedido">Novo pedido</CommandItem>
          <CommandItem value="convidar">Convidar membro</CommandItem>
          <CommandItem value="faturamento" disabled>
            Configurar faturamento
          </CommandItem>
        </CommandGroup>
      </Command>
    </Stack>
  );
}
