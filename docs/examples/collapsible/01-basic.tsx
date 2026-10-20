/**
 * @title Básico
 * @description `heading` é o texto do gatilho; o conteúdo abre e fecha a cada clique. Use `open` para começar aberto.
 */
"use client";

import { Collapsible, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function CollapsibleBasic() {
  return (
    <Stack maxWidth="sm">
      <Collapsible heading="Ver detalhes do frete">
        <Stack gap="xs">
          <Text>Transportadora: Correios (SEDEX)</Text>
          <Text>Prazo: 2 dias úteis</Text>
          <Text>Valor: R$ 18,90</Text>
        </Stack>
      </Collapsible>
    </Stack>
  );
}
