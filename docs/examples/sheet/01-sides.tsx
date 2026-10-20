/**
 * @title Lados
 * @description `side` escolhe a borda de onde o painel entra: `right` (padrão), `left`, `top` ou `bottom`.
 */
"use client";

import { useState } from "react";
import { Button, Sheet, Stack, Text } from "@phsa.tec/design-system-react/react";

const SIDES = [
  { side: "top", label: "Em cima" },
  { side: "right", label: "Direita" },
  { side: "bottom", label: "Embaixo" },
  { side: "left", label: "Esquerda" },
] as const;

type Side = (typeof SIDES)[number]["side"];

export default function SheetSides() {
  const [side, setSide] = useState<Side | null>(null);

  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      {SIDES.map((option) => (
        <Button key={option.side} type="button" variant="outline" onClick={() => setSide(option.side)}>
          {option.label}
        </Button>
      ))}

      <Sheet open={side !== null} side={side ?? "right"} heading="Notificações" onClose={() => setSide(null)}>
        <Text tone="muted">Você não tem notificações novas.</Text>
      </Sheet>
    </Stack>
  );
}
