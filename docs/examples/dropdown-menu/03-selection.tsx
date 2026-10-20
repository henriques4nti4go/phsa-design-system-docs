/**
 * @title Escolhendo uma opção
 * @description Guarde o `detail.value` no estado para refletir a escolha no gatilho; `disabled` bloqueia um item.
 */
"use client";

import { useState } from "react";
import { Button, DropdownItem, DropdownMenu } from "@phsa.tec/design-system-react/react";

const SORTS: Record<string, string> = {
  relevancia: "Mais relevantes",
  "menor-preco": "Menor preço",
  "maior-preco": "Maior preço",
  avaliacao: "Melhor avaliados",
};

export default function DropdownMenuSelection() {
  const [sort, setSort] = useState("relevancia");

  return (
    <DropdownMenu align="start" onPhsaSelect={(e) => setSort((e as CustomEvent<{ value: string }>).detail.value)}>
      <Button slot="trigger" type="button" variant="outline">
        Ordenar: {SORTS[sort]}
      </Button>
      <DropdownItem value="relevancia">Mais relevantes</DropdownItem>
      <DropdownItem value="menor-preco">Menor preço</DropdownItem>
      <DropdownItem value="maior-preco">Maior preço</DropdownItem>
      <DropdownItem value="avaliacao" disabled>
        Melhor avaliados
      </DropdownItem>
    </DropdownMenu>
  );
}
