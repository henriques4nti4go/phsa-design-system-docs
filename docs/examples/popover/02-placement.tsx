/**
 * @title Posição
 * @description `side` escolhe o lado do gatilho (padrão `bottom`) e `align` o alinhamento nesse lado: `start`, `center` ou `end`.
 */
"use client";

import { Button, Popover, Stack, Text } from "@phsa.tec/design-system-react/react";

const PLACEMENTS = [
  { side: "bottom", align: "start" },
  { side: "bottom", align: "end" },
  { side: "top", align: "center" },
  { side: "right", align: "center" },
] as const;

export default function PopoverPlacement() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      {PLACEMENTS.map(({ side, align }) => (
        <Popover key={`${side}-${align}`} side={side} align={align}>
          <Button slot="trigger" type="button" variant="outline">
            {side} / {align}
          </Button>
          <Text variant="small">
            Painel em side=&quot;{side}&quot; e align=&quot;{align}&quot;.
          </Text>
        </Popover>
      ))}
    </Stack>
  );
}
