/**
 * @title Área de mídia
 * @description Reserve o espaço de um vídeo ou imagem antes de ela carregar: o conteúdo preenche a caixa inteira.
 */
"use client";

import { AspectRatio, Icon, Stack, Text } from "@phsa.tec/design-system-react/react";
import { Play } from "@phsa.tec/design-system-react/icons/play";

export default function AspectRatioMedia() {
  return (
    <Stack maxWidth="md" gap="sm">
      <AspectRatio ratio="16/9">
        <Stack background="primary" minHeight="full" align="center" justify="center" gap="sm">
          <Icon icon={Play} size="xl" />
          <Text weight="medium">Como emitir sua nota fiscal</Text>
        </Stack>
      </AspectRatio>
      <Text variant="small" tone="muted">
        Vídeo · 4 min
      </Text>
    </Stack>
  );
}
