/**
 * @title Controlado
 * @description `onPhsaToggle` avisa quando abre ou fecha, com o estado em `detail.open`; passe `open` para controlar de fora.
 */
"use client";

import { useState } from "react";
import { Button, Collapsible, Stack, Text } from "@phsa.tec/design-system-react/react";

const openOf = (e: Event) => (e as CustomEvent<{ open: boolean }>).detail.open;

export default function CollapsibleControlled() {
  const [open, setOpen] = useState(false);

  return (
    <Stack maxWidth="sm" gap="md">
      <Collapsible heading="Filtros avançados" open={open} onPhsaToggle={(e) => setOpen(openOf(e))}>
        <Text tone="muted">Categoria, faixa de preço e avaliação mínima.</Text>
      </Collapsible>
      <Stack direction="row" gap="sm" align="center" justify="between">
        <Text variant="small" tone="muted">
          {open ? "Aberto" : "Fechado"}
        </Text>
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          {open ? "Recolher" : "Expandir"}
        </Button>
      </Stack>
    </Stack>
  );
}
