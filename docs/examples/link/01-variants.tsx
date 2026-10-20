/**
 * @title Variantes
 * @description `default` destaca o link na cor primária, `muted` fica discreto e `inherit` assume a cor e o tamanho do texto em volta.
 */
"use client";

import { Link, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function LinkVariants() {
  return (
    <Stack gap="sm" align="center">
      <Stack direction="row" gap="lg" wrap justify="center">
        <Link href="#" onClick={(e) => e.preventDefault()}>
          Ver detalhes do pedido
        </Link>
        <Link href="#" variant="muted" onClick={(e) => e.preventDefault()}>
          Política de privacidade
        </Link>
      </Stack>
      <Text tone="muted">
        Ao continuar, você concorda com os{" "}
        <Link href="#" variant="inherit" size="inherit" onClick={(e) => e.preventDefault()}>
          termos de uso
        </Link>
        .
      </Text>
    </Stack>
  );
}
