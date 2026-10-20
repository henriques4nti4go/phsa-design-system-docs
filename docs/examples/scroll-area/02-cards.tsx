/**
 * @title Carrossel de cartões
 * @description A área acompanha a largura do contêiner; o conteúdo mais largo que ela vira rolagem, sem esticar a página.
 */
"use client";

import { ScrollArea, Stack, Text } from "@phsa.tec/design-system-react/react";

const ofertas = [
  { produto: "Televisor", preco: 2199 },
  { produto: "Fritadeira", preco: 349 },
  { produto: "Cafeteira", preco: 279 },
  { produto: "Notebook", preco: 3499 },
  { produto: "Ventilador", preco: 159 },
  { produto: "Aspirador", preco: 429 },
];

const real = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function ScrollAreaCards() {
  return (
    <Stack maxWidth="md">
      <ScrollArea orientation="horizontal">
        <Stack direction="row" gap="md" padding="xs">
          {ofertas.map(({ produto, preco }) => (
            <Stack key={produto} background="muted" padding="lg" radius="md" gap="xs">
              <Text weight="medium">{produto}</Text>
              <Text variant="h4">{real.format(preco)}</Text>
            </Stack>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
