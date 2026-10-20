/**
 * @title Controlada
 * @description Guarde a página no estado: `page` e `pageCount` definem a posição e `onPhsaChange` entrega `detail.page`.
 */
"use client";

import { useState } from "react";
import { Pagination, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function PaginationControlled() {
  const [page, setPage] = useState(1);

  return (
    <Stack gap="sm" align="center">
      <Pagination
        page={page}
        pageCount={10}
        onPhsaChange={(event) => setPage((event as CustomEvent<{ page: number }>).detail.page)}
      />
      <Text variant="small" tone="muted">
        Página {page} de 10
      </Text>
    </Stack>
  );
}
