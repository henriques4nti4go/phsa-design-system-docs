/**
 * @title Variantes
 * @description `variant` escolhe a cor: as neutras para categorias e `success`, `warning`, `destructive` e `info` para status.
 */
"use client";

import { Badge, Stack } from "@phsa.tec/design-system-react/react";

export default function BadgeVariants() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="info">Info</Badge>
    </Stack>
  );
}
