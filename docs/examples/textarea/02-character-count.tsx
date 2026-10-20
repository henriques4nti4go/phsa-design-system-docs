/**
 * @title Contador de caracteres
 * @description `maxLength` impede digitar além do limite; com `onInput` dá para mostrar quantos caracteres restam.
 */
"use client";

import { useState } from "react";
import { Stack, Text, Textarea } from "@phsa.tec/design-system-react/react";

const LIMIT = 280;

export default function TextareaCharacterCount() {
  const [bio, setBio] = useState("");

  return (
    <Stack maxWidth="sm" gap="xs">
      <Textarea
        label="Sobre você"
        placeholder="Conte um pouco da sua experiência…"
        maxLength={LIMIT}
        value={bio}
        onInput={(e) => setBio((e.target as HTMLTextAreaElement).value)}
      />
      <Text variant="small" tone="muted" align="end">
        {LIMIT - bio.length} caracteres restantes
      </Text>
    </Stack>
  );
}
