/**
 * @title Posições
 * @description `side` escolhe o lado: `top` (padrão), `right`, `bottom` ou `left`.
 */
"use client";

import { Button, Stack, Tooltip } from "@phsa.tec/design-system-react/react";

const SIDES = [
  { side: "top", label: "Em cima" },
  { side: "right", label: "À direita" },
  { side: "bottom", label: "Embaixo" },
  { side: "left", label: "À esquerda" },
] as const;

export default function TooltipSides() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      {SIDES.map(({ side, label }) => (
        <Tooltip key={side} side={side} text={`side="${side}"`}>
          <Button slot="trigger" type="button" variant="outline">
            {label}
          </Button>
        </Tooltip>
      ))}
    </Stack>
  );
}
