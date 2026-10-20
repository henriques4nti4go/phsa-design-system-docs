/**
 * @title Indeterminado
 * @description Sem `value`, a barra fica em movimento contínuo: use quando não dá para saber quanto falta.
 */
"use client";

import { Progress, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function ProgressIndeterminate() {
  return (
    <Stack maxWidth="sm" gap="xs">
      <Progress label="Gerando relatório" />
      <Text variant="small" tone="muted">
        Gerando o relatório anual…
      </Text>
    </Stack>
  );
}
