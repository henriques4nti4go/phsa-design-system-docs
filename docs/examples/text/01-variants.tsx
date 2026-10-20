/**
 * @title Escala tipográfica
 * @description `variant` define tamanho, peso e elemento: `display` e `h1`…`h4` viram títulos, `lead`, `body` e `small` viram parágrafos.
 */
"use client";

import { Stack, Text } from "@phsa.tec/design-system-react/react";

export default function TextVariants() {
  return (
    <Stack gap="sm" maxWidth="xl">
      <Text variant="display">Display</Text>
      <Text variant="h1">Título 1</Text>
      <Text variant="h2">Título 2</Text>
      <Text variant="h3">Título 3</Text>
      <Text variant="h4">Título 4</Text>
      <Text variant="lead">Lead: abre uma seção com um resumo maior.</Text>
      <Text>Body: o texto padrão de parágrafos, formulários e tabelas.</Text>
      <Text variant="small">Small: legendas, datas e notas de rodapé.</Text>
    </Stack>
  );
}
