/**
 * @title Superfície
 * @description `background`, `padding`, `radius` e `bordered` transformam o stack em uma caixa; cada fundo já traz a cor de texto que combina com ele.
 */
"use client";

import { Stack, Text } from "@phsa.tec/design-system-react/react";

const backgrounds = ["muted", "primary", "secondary", "accent"] as const;

export default function StackSurface() {
  return (
    <Stack direction="row" gap="md" wrap justify="center">
      {backgrounds.map((background) => (
        <Stack key={background} background={background} padding="lg" radius="lg" gap="xs">
          <Text weight="semibold">{background}</Text>
          <Text variant="small">Texto no fundo</Text>
        </Stack>
      ))}
      <Stack padding="lg" radius="lg" gap="xs" bordered>
        <Text weight="semibold">bordered</Text>
        <Text variant="small">Só a borda</Text>
      </Stack>
    </Stack>
  );
}
