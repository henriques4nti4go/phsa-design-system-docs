/**
 * @title Proporções
 * @description `ratio` aceita `16/9`, `4/3`, `1` ou qualquer número; a altura acompanha a largura disponível.
 */
"use client";

import { AspectRatio, Grid, Stack, Text } from "@phsa.tec/design-system-react/react";

const ratios = ["16/9", "4/3", "1"];

export default function AspectRatioRatios() {
  return (
    <Stack maxWidth="2xl">
      <Grid columns={3} gap="md" align="start" stackBelow="sm">
        {ratios.map((ratio) => (
          <AspectRatio key={ratio} ratio={ratio}>
            <Stack background="muted" minHeight="full" align="center" justify="center">
              <Text tone="muted">{ratio}</Text>
            </Stack>
          </AspectRatio>
        ))}
      </Grid>
    </Stack>
  );
}
