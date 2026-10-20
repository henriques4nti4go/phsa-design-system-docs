/**
 * @title Alinhamento
 * @description `align` posiciona os itens no eixo cruzado e `justify` no eixo principal; `between` espalha os itens pelas pontas.
 */
"use client";

import { Button, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function StackAlignJustify() {
  return (
    <Stack maxWidth="lg" gap="md">
      <Stack direction="row" align="center" justify="between" padding="md" radius="md" bordered>
        <Stack gap="none">
          <Text weight="semibold">Plano Profissional</Text>
          <Text variant="small" tone="muted">
            R$ 49,90 por mês
          </Text>
        </Stack>
        <Button size="sm">Assinar</Button>
      </Stack>
      <Stack direction="row" gap="sm" justify="end">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar alterações</Button>
      </Stack>
    </Stack>
  );
}
