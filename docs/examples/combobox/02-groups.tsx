/**
 * @title Grupos
 * @description `<optgroup>` agrupa as opções na lista; a busca filtra dentro de todos os grupos.
 */
"use client";

import { Combobox, Stack } from "@phsa.tec/design-system-react/react";

export default function ComboboxGroups() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Combobox label="Banco" placeholder="Nome ou código">
        <optgroup label="Públicos">
          <option value="001">001 · Banco do Brasil</option>
          <option value="104">104 · Caixa Econômica Federal</option>
        </optgroup>
        <optgroup label="Privados">
          <option value="237">237 · Bradesco</option>
          <option value="341">341 · Itaú Unibanco</option>
          <option value="033">033 · Santander</option>
        </optgroup>
        <optgroup label="Digitais">
          <option value="260">260 · Nubank</option>
          <option value="077">077 · Inter</option>
        </optgroup>
      </Combobox>
    </Stack>
  );
}
