/**
 * @title Espaçamento
 * @description `gap` usa a escala do DS: `none`, `xs`, `sm`, `md` (padrão), `lg`, `xl` e `2xl`.
 */
"use client";

import { Stack, Text } from "@phsa.tec/design-system-react/react";

const gaps = ["xs", "md", "xl"] as const;

export default function StackGap() {
  return (
    <Stack gap="lg">
      {gaps.map((gap) => (
        <Stack key={gap} direction="row" gap="md" align="center">
          <Text variant="small" tone="muted">
            {gap}
          </Text>
          <Stack direction="row" gap={gap}>
            <Stack background="muted" padding="md" radius="md">A</Stack>
            <Stack background="muted" padding="md" radius="md">B</Stack>
            <Stack background="muted" padding="md" radius="md">C</Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
