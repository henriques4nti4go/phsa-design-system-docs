/**
 * @title Básico
 * @description O botão com `slot="trigger"` abre e fecha o painel; clique fora ou Escape também fecham.
 */
"use client";

import { Button, Input, Popover, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function PopoverBasic() {
  return (
    <Popover>
      <Button slot="trigger" type="button" variant="outline">
        Dimensões
      </Button>
      <Stack gap="md">
        <Stack gap="xs">
          <Text variant="h4" as="span">
            Dimensões
          </Text>
          <Text variant="small" tone="muted">
            Tamanho da imagem em pixels.
          </Text>
        </Stack>
        <Input label="Largura" size="sm" value="1280" />
        <Input label="Altura" size="sm" value="720" />
      </Stack>
    </Popover>
  );
}
