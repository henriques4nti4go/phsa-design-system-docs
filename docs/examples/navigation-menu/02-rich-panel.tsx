/**
 * @title Painel com descrições
 * @description O painel aceita qualquer layout: aqui, um `Grid` com título e descrição para cada destino.
 */
"use client";

import { Grid, Link, NavigationMenu, NavigationMenuItem, Stack, Text } from "@phsa.tec/design-system-react/react";

const produtos = [
  { titulo: "Conta digital", descricao: "Pix, boletos e cartão sem tarifa." },
  { titulo: "Maquininha", descricao: "Receba no débito, crédito e Pix." },
  { titulo: "Empréstimo", descricao: "Crédito para capital de giro." },
  { titulo: "Seguros", descricao: "Proteção para a sua empresa." },
];

export default function NavigationMenuRichPanel() {
  return (
    <NavigationMenu label="Site" onClick={(e) => e.preventDefault()}>
      <NavigationMenuItem label="Produtos">
        <Grid columns={2} gap="md">
          {produtos.map(({ titulo, descricao }) => (
            <Stack key={titulo} gap="xs">
              <Link href="#">{titulo}</Link>
              <Text variant="small" tone="muted">
                {descricao}
              </Text>
            </Stack>
          ))}
        </Grid>
      </NavigationMenuItem>
      <NavigationMenuItem href="#">Para empresas</NavigationMenuItem>
      <NavigationMenuItem href="#">Blog</NavigationMenuItem>
    </NavigationMenu>
  );
}
