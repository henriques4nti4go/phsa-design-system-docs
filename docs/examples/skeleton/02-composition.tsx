/**
 * @title Composição
 * @description Combine as variantes com `Stack` e `Grid` para imitar o formato do conteúdo que vai chegar.
 */
"use client";

import { Grid, Skeleton, Stack } from "@phsa.tec/design-system-react/react";

export default function SkeletonComposition() {
  return (
    <Stack maxWidth="sm" gap="md" padding="lg" bordered radius="lg" aria-busy="true">
      <Stack direction="row" gap="md" align="center">
        <Skeleton variant="circular" />
        <Stack gap="sm" grow>
          <Skeleton variant="text" />
          <Grid columns={2}>
            <Skeleton variant="text" />
          </Grid>
        </Stack>
      </Stack>
      <Skeleton variant="rectangular" />
    </Stack>
  );
}
