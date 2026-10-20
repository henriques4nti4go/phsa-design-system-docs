/**
 * @title Prefixo, sufixo e limpar
 * @description `prefix` e `suffix` recebem texto; para um ícone use o slot de mesmo nome. `clearable` mostra um botão para apagar o valor.
 */
"use client";

import { Icon, Input, Stack } from "@phsa.tec/design-system-react/react";
import { Search } from "@phsa.tec/design-system-react/icons/search";

export default function InputPrefixSuffix() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Input label="Site" prefix="https://" placeholder="minhaloja.com.br" />
      <Input label="Peso" type="number" suffix="kg" placeholder="0" />
      <Input label="Buscar" placeholder="Produto, marca ou código" value="Cafeteira" clearable>
        <Icon slot="prefix" icon={Search} size="sm" />
      </Input>
    </Stack>
  );
}
