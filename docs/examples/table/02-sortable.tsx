/**
 * @title Ordenação
 * @description `sortable` torna o cabeçalho clicável; controle o estado com `sortKey`/`sortDirection` e ordene os dados em `onPhsaSort`.
 */
"use client";

import { useState } from "react";
import { Cell, Column, Row, Stack, Table } from "@phsa.tec/design-system-react/react";

type Product = { sku: string; name: string; stock: number };
type Sort = { key: string; direction: "asc" | "desc" | "" };

const products: Product[] = [
  { sku: "CAF-01", name: "Café torrado 500 g", stock: 48 },
  { sku: "ACU-02", name: "Açúcar cristal 1 kg", stock: 120 },
  { sku: "ARR-03", name: "Arroz agulhinha 5 kg", stock: 9 },
  { sku: "FEI-04", name: "Feijão carioca 1 kg", stock: 64 },
  { sku: "OLE-05", name: "Óleo de soja 900 ml", stock: 31 },
];

// No React, `key` é reservado e não chega à `Column`: a coluna é identificada pelo índice.
const NAME = "1";
const STOCK = "2";

const compare = (a: Product, b: Product, key: string) =>
  key === STOCK ? a.stock - b.stock : a.name.localeCompare(b.name, "pt-BR");

export default function TableSortable() {
  const [sort, setSort] = useState<Sort>({ key: NAME, direction: "asc" });

  const rows = sort.direction
    ? [...products].sort((a, b) => compare(a, b, sort.key) * (sort.direction === "asc" ? 1 : -1))
    : products;

  return (
    <Stack maxWidth="2xl">
      <Table
        sortKey={sort.key}
        sortDirection={sort.direction}
        onPhsaSort={(event) => setSort((event as CustomEvent<Sort>).detail)}
      >
        <Column label="SKU" width="7rem" />
        <Column label="Produto" sortable />
        <Column label="Estoque" align="right" sortable />
        {rows.map((product) => (
          <Row key={product.sku}>
            <Cell>{product.sku}</Cell>
            <Cell>{product.name}</Cell>
            <Cell>{product.stock}</Cell>
          </Row>
        ))}
      </Table>
    </Stack>
  );
}
