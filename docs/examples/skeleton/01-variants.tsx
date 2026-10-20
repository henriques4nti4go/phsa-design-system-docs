/**
 * @title Variantes
 * @description `text` é uma linha, `circular` um avatar e `rectangular` um bloco; `animated={false}` desliga o pulso.
 */
"use client";

import { Skeleton, Stack } from "@phsa.tec/design-system-react/react";

export default function SkeletonVariants() {
  return (
    <Stack gap="md" maxWidth="sm">
      <Skeleton variant="text" />
      <Skeleton variant="circular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="text" animated={false} />
    </Stack>
  );
}
