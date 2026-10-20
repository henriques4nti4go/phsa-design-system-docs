/**
 * @title Peso e elemento
 * @description `weight` troca só o peso da variante; `as` muda o elemento HTML sem mudar o visual.
 */
"use client";

import { Stack, Text } from "@phsa.tec/design-system-react/react";

export default function TextWeightAs() {
  return (
    <Stack gap="md" align="center">
      <Stack direction="row" gap="md" wrap justify="center">
        <Text weight="normal">Normal</Text>
        <Text weight="medium">Medium</Text>
        <Text weight="semibold">Semibold</Text>
        <Text weight="bold">Bold</Text>
      </Stack>
      <Text variant="h2" as="p" weight="medium">
        Visual de h2, mas é um parágrafo
      </Text>
    </Stack>
  );
}
