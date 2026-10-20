/**
 * @title Muitas páginas
 * @description Com muitas páginas, as distantes viram reticências; `siblingCount` diz quantas aparecem de cada lado da atual.
 */
"use client";

import { Pagination, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function PaginationSiblings() {
  return (
    <Stack gap="md" align="center">
      <Text variant="small" tone="muted">siblingCount=0</Text>
      <Pagination page={25} pageCount={50} siblingCount={0} />
      <Text variant="small" tone="muted">siblingCount=1 (padrão)</Text>
      <Pagination page={25} pageCount={50} />
      <Text variant="small" tone="muted">siblingCount=2</Text>
      <Pagination page={25} pageCount={50} siblingCount={2} />
    </Stack>
  );
}
