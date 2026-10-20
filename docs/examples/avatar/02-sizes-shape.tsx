/**
 * @title Tamanhos e formato
 * @description `size` aceita `sm`, `default` e `lg`; `shape="square"` troca o círculo por cantos arredondados, bom para empresas.
 */
"use client";

import { Avatar, Stack } from "@phsa.tec/design-system-react/react";

export default function AvatarSizesShape() {
  return (
    <Stack gap="md" align="center">
      <Stack direction="row" gap="md" align="center" wrap justify="center">
        <Avatar size="sm" name="Gabriel Martins" />
        <Avatar name="Gabriel Martins" />
        <Avatar size="lg" name="Gabriel Martins" />
      </Stack>
      <Stack direction="row" gap="md" align="center" wrap justify="center">
        <Avatar size="sm" shape="square" name="Padaria Pão Quente" />
        <Avatar shape="square" name="Padaria Pão Quente" />
        <Avatar size="lg" shape="square" name="Padaria Pão Quente" />
      </Stack>
    </Stack>
  );
}
