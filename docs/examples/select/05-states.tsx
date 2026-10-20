/**
 * @title Tamanhos e estados
 * @description `size` segue o `Input`; `disabled` no `Select` bloqueia o campo e no `<option>` bloqueia só a opção. `error` mostra a mensagem.
 */
"use client";

import { Select, Stack } from "@phsa.tec/design-system-react/react";

export default function SelectStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Select size="sm" label="Pequeno" value="br">
        <option value="br">Brasil</option>
        <option value="pt">Portugal</option>
      </Select>
      <Select label="Desabilitado" value="br" disabled>
        <option value="br">Brasil</option>
      </Select>
      <Select label="Parcelamento" placeholder="Em quantas vezes?">
        <option value="1">À vista</option>
        <option value="3">3x sem juros</option>
        <option value="12" disabled>
          12x (indisponível)
        </option>
      </Select>
      <Select label="Banco" placeholder="Selecione" error="Escolha um banco para o reembolso.">
        <option value="001">Banco do Brasil</option>
        <option value="104">Caixa</option>
        <option value="341">Itaú</option>
      </Select>
    </Stack>
  );
}
