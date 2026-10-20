/**
 * @title Perfil
 * @description Mostra uma prévia rica no hover ou no foco do `slot="trigger"`; dá para levar o mouse até o cartão sem ele sumir.
 */
"use client";

import { Avatar, Button, HoverCard, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function HoverCardProfile() {
  return (
    <HoverCard>
      <Button slot="trigger" type="button" variant="link">
        @anacosta
      </Button>
      <Stack direction="row" gap="md">
        <Avatar name="Ana Costa" />
        <Stack gap="xs">
          <Text weight="semibold">Ana Costa</Text>
          <Text variant="small">Designer de produto em Recife. Cuida do design system do time de pagamentos.</Text>
          <Text variant="small" tone="muted">
            Entrou em março de 2024
          </Text>
        </Stack>
      </Stack>
    </HoverCard>
  );
}
