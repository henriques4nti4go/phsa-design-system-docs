/**
 * @title Posições
 * @description `side` (padrão `bottom`) e `align` (padrão `start`) posicionam o cartão em relação ao gatilho.
 */
"use client";

import { Button, HoverCard, Stack, Text } from "@phsa.tec/design-system-react/react";

const SIDES = ["top", "right", "bottom", "left"] as const;

export default function HoverCardSides() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      {SIDES.map((side) => (
        <HoverCard key={side} side={side} align="center">
          <Button slot="trigger" type="button" variant="outline">
            {side}
          </Button>
          <Text variant="small">
            Cartão com side=&quot;{side}&quot;.
          </Text>
        </HoverCard>
      ))}
    </Stack>
  );
}
