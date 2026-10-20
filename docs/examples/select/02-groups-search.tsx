/**
 * @title Grupos e busca
 * @description `<optgroup>` agrupa as opções e `searchable` põe um campo de busca no topo da lista, que ignora acentos.
 */
"use client";

import { Select, Stack } from "@phsa.tec/design-system-react/react";

export default function SelectGroupsSearch() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Select label="Estado" placeholder="Selecione o estado" searchable searchPlaceholder="Buscar estado...">
        <optgroup label="Sudeste">
          <option value="sp">São Paulo</option>
          <option value="rj">Rio de Janeiro</option>
          <option value="mg">Minas Gerais</option>
          <option value="es">Espírito Santo</option>
        </optgroup>
        <optgroup label="Sul">
          <option value="pr">Paraná</option>
          <option value="sc">Santa Catarina</option>
          <option value="rs">Rio Grande do Sul</option>
        </optgroup>
        <optgroup label="Nordeste">
          <option value="ba">Bahia</option>
          <option value="pe">Pernambuco</option>
          <option value="ce">Ceará</option>
        </optgroup>
      </Select>
    </Stack>
  );
}
