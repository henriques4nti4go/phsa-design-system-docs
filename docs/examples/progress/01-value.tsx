/**
 * @title Com valor
 * @description `value` vai de 0 a `max` (padrão 100); `label` dá o nome lido pelos leitores de tela.
 */
"use client";

import { Progress, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function ProgressValue() {
  return (
    <Stack maxWidth="sm" gap="xs">
      <Stack direction="row" justify="between">
        <Text variant="small" weight="medium">Armazenamento</Text>
        <Text variant="small" tone="muted">
          13,2 GB de 20 GB
        </Text>
      </Stack>
      <Progress value={13.2} max={20} label="Armazenamento usado" />
    </Stack>
  );
}
