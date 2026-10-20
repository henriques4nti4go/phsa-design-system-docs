/**
 * @title Básico
 * @description O usuário digita para filtrar os `<option>`; o campo mostra o rótulo, mas o valor é o `value` da opção escolhida.
 */
"use client";

import { Combobox, Stack } from "@phsa.tec/design-system-react/react";

export default function ComboboxBasic() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Combobox label="Cidade" placeholder="Digite para buscar">
        <option value="sao-paulo">São Paulo</option>
        <option value="campinas">Campinas</option>
        <option value="rio-de-janeiro">Rio de Janeiro</option>
        <option value="belo-horizonte">Belo Horizonte</option>
        <option value="curitiba">Curitiba</option>
        <option value="porto-alegre">Porto Alegre</option>
        <option value="salvador">Salvador</option>
        <option value="recife">Recife</option>
      </Combobox>
    </Stack>
  );
}
