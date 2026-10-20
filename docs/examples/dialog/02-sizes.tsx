/**
 * @title Tamanhos
 * @description `size` define a largura máxima: `sm`, `default`, `lg`, `xl` ou `full`.
 */
"use client";

import { useState } from "react";
import { Button, Dialog, Stack, Text } from "@phsa.tec/design-system-react/react";

const SIZES = ["sm", "default", "lg", "xl", "full"] as const;

type Size = (typeof SIZES)[number];

export default function DialogSizes() {
  const [size, setSize] = useState<Size | null>(null);

  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      {SIZES.map((option) => (
        <Button key={option} type="button" variant="outline" onClick={() => setSize(option)}>
          {option}
        </Button>
      ))}

      <Dialog open={size !== null} size={size ?? "default"} heading={`size="${size}"`} onClose={() => setSize(null)}>
        <Text tone="muted">A largura da janela acompanha o tamanho escolhido; a altura cresce com o conteúdo.</Text>
        <Button slot="footer" type="button" onClick={() => setSize(null)}>
          Fechar
        </Button>
      </Dialog>
    </Stack>
  );
}
