/**
 * @title Tamanhos
 * @description `size` aceita `sm`, `default` e `lg`, com as mesmas alturas do `Button`.
 */
"use client";

import { Input, Stack } from "@phsa.tec/design-system-react/react";

export default function InputSizes() {
  return (
    <Stack maxWidth="sm" gap="md">
      <Input size="sm" label="Pequeno" placeholder="Altura 32px" />
      <Input label="Padrão" placeholder="Altura 36px" />
      <Input size="lg" label="Grande" placeholder="Altura 40px" />
    </Stack>
  );
}
