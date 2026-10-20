/**
 * @title Alinhamento
 * @description `align` alinha o menu ao gatilho (`start`, `center` ou `end`) e `side` troca o lado em que ele abre.
 */
"use client";

import { Button, DropdownItem, DropdownMenu, Stack } from "@phsa.tec/design-system-react/react";

const ALIGNS = ["start", "center", "end"] as const;

export default function DropdownMenuAlign() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      {ALIGNS.map((align) => (
        <DropdownMenu key={align} align={align}>
          <Button slot="trigger" type="button" variant="outline">
            align=&quot;{align}&quot;
          </Button>
          <DropdownItem>Perfil</DropdownItem>
          <DropdownItem>Configurações</DropdownItem>
          <DropdownItem>Sair</DropdownItem>
        </DropdownMenu>
      ))}
      <DropdownMenu side="top">
        <Button slot="trigger" type="button" variant="outline">
          side=&quot;top&quot;
        </Button>
        <DropdownItem>Perfil</DropdownItem>
        <DropdownItem>Configurações</DropdownItem>
        <DropdownItem>Sair</DropdownItem>
      </DropdownMenu>
    </Stack>
  );
}
