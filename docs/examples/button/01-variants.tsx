/**
 * @title Variantes
 * @description `variant` muda a ênfase: use `default` para a ação principal e `outline` ou `ghost` para as secundárias.
 */
"use client";

import { Button, Stack } from "@phsa.tec/design-system-react/react";

export default function ButtonVariants() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </Stack>
  );
}
