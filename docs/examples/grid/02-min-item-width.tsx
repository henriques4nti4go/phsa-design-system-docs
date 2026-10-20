/**
 * @title Colunas automáticas
 * @description Com `minItemWidth`, cabem quantas colunas couberem na largura disponível e `columns` é ignorado; redimensione a janela para ver.
 */
"use client";

import { Grid, Stack, Text } from "@phsa.tec/design-system-react/react";

const cidades = [
  { nome: "São Paulo", estado: "SP" },
  { nome: "Rio de Janeiro", estado: "RJ" },
  { nome: "Belo Horizonte", estado: "MG" },
  { nome: "Salvador", estado: "BA" },
  { nome: "Curitiba", estado: "PR" },
  { nome: "Recife", estado: "PE" },
  { nome: "Porto Alegre", estado: "RS" },
];

export default function GridMinItemWidth() {
  return (
    <Stack maxWidth="4xl">
      <Grid minItemWidth="10rem" gap="sm">
        {cidades.map(({ nome, estado }) => (
          <Stack key={nome} background="muted" padding="md" radius="md" gap="none">
            <Text weight="medium">{nome}</Text>
            <Text variant="small" tone="muted">
              {estado}
            </Text>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
}
