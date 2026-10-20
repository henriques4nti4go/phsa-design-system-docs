/**
 * @title Tamanhos
 * @description `size` aceita `sm`, `default` e `lg`; use `inherit` para o link seguir o tamanho do texto ao redor.
 */
"use client";

import { Link, Stack } from "@phsa.tec/design-system-react/react";

export default function LinkSizes() {
  return (
    <Stack direction="row" gap="lg" align="baseline" wrap justify="center">
      <Link href="#" size="sm" onClick={(e) => e.preventDefault()}>
        Pequeno
      </Link>
      <Link href="#" onClick={(e) => e.preventDefault()}>
        Padrão
      </Link>
      <Link href="#" size="lg" onClick={(e) => e.preventDefault()}>
        Grande
      </Link>
    </Stack>
  );
}
