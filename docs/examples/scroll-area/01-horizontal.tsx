/**
 * @title Rolagem horizontal
 * @description `orientation="horizontal"` rola para o lado uma linha que não cabe na largura, com a barra discreta do DS.
 */
"use client";

import { Badge, ScrollArea, Stack } from "@phsa.tec/design-system-react/react";

const categorias = [
  "Celulares",
  "Notebooks",
  "Eletrodomésticos",
  "Games",
  "Livros",
  "Moda",
  "Beleza",
  "Esporte e lazer",
  "Ferramentas",
  "Pet shop",
  "Brinquedos",
  "Mercado",
];

export default function ScrollAreaHorizontal() {
  return (
    <Stack maxWidth="sm">
      <ScrollArea orientation="horizontal">
        <Stack direction="row" gap="sm" padding="sm">
          {categorias.map((categoria) => (
            <Badge key={categoria} variant="outline">
              {categoria}
            </Badge>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
