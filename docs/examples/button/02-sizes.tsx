/**
 * @title Tamanhos
 * @description `size="icon"` deixa o botão quadrado; dê um `aria-label` quando ele tiver só o ícone.
 */
"use client";

import { Button, Icon, Stack } from "@phsa.tec/design-system-react/react";
import { Plus } from "@phsa.tec/design-system-react/icons/plus";

export default function ButtonSizes() {
  return (
    <Stack direction="row" gap="sm" align="center" wrap justify="center">
      <Button size="sm">Pequeno</Button>
      <Button>Padrão</Button>
      <Button size="lg">Grande</Button>
      <Button size="icon" aria-label="Adicionar">
        <Icon icon={Plus} size="sm" />
      </Button>
    </Stack>
  );
}
