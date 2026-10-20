/**
 * @title Estados
 * @description `disabled` e `readOnly` impedem a escolha; `error` mostra a mensagem e marca o campo como inválido.
 */
"use client";

import { Combobox, Stack } from "@phsa.tec/design-system-react/react";

export default function ComboboxStates() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Combobox label="Desabilitado" value="sp" disabled>
        <option value="sp">São Paulo</option>
      </Combobox>
      <Combobox label="Somente leitura" value="rj" readOnly>
        <option value="rj">Rio de Janeiro</option>
      </Combobox>
      <Combobox label="Profissão" placeholder="Buscar profissão" error="Selecione uma profissão da lista.">
        <option value="engenheiro">Engenheiro(a)</option>
        <option value="medico">Médico(a)</option>
        <option value="professor">Professor(a)</option>
      </Combobox>
    </Stack>
  );
}
