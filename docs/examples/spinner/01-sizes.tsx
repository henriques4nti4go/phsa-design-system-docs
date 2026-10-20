/**
 * @title Tamanhos
 * @description `size` aceita `sm`, `default` e `lg`.
 */
"use client";

import { Spinner, Stack } from "@phsa.tec/design-system-react/react";

export default function SpinnerSizes() {
  return (
    <Stack direction="row" gap="lg" align="center" wrap justify="center">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </Stack>
  );
}
