/**
 * @title Tamanhos
 * @description `size` vai de `xs` (12px) a `xl` (32px); o padrão é `sm` (16px). `strokeWidth` afina ou engrossa o traço.
 */
"use client";

import { Icon, Stack } from "@phsa.tec/design-system-react/react";
import { Bell } from "@phsa.tec/design-system-react/icons/bell";

export default function IconSizes() {
  return (
    <Stack gap="md" align="center">
      <Stack direction="row" gap="md" align="center" wrap justify="center">
        <Icon icon={Bell} size="xs" />
        <Icon icon={Bell} size="sm" />
        <Icon icon={Bell} size="md" />
        <Icon icon={Bell} size="lg" />
        <Icon icon={Bell} size="xl" />
      </Stack>
      <Stack direction="row" gap="md" align="center" wrap justify="center">
        <Icon icon={Bell} size="xl" strokeWidth={1} />
        <Icon icon={Bell} size="xl" strokeWidth={2} />
        <Icon icon={Bell} size="xl" strokeWidth={3} />
      </Stack>
    </Stack>
  );
}
