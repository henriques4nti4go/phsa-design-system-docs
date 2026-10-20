/**
 * @title Básico
 * @description Os filhos são `<option>`, como no `<select>` nativo; `placeholder` aparece enquanto nada foi escolhido.
 */
"use client";

import { Select, Stack } from "@phsa.tec/design-system-react/react";

export default function SelectBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Select label="Estado civil" placeholder="Selecione">
        <option value="solteiro">Solteiro(a)</option>
        <option value="casado">Casado(a)</option>
        <option value="divorciado">Divorciado(a)</option>
        <option value="viuvo">Viúvo(a)</option>
      </Select>
    </Stack>
  );
}
