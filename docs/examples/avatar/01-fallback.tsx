/**
 * @title Imagem e fallback
 * @description Com `src`, mostra a foto; se ela falhar ou faltar, usa as iniciais de `name` e, sem nome, um ícone.
 */
"use client";

import { Avatar, Stack } from "@phsa.tec/design-system-react/react";

export default function AvatarFallback() {
  return (
    <Stack direction="row" gap="md" align="center" wrap justify="center">
      <Avatar src="https://i.pravatar.cc/120?img=47" alt="Camila Ribeiro" />
      <Avatar src="/foto-inexistente.jpg" name="Lucas Ferreira" />
      <Avatar name="Ana Beatriz Santos" />
      <Avatar />
    </Stack>
  );
}
