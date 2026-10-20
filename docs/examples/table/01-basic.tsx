/**
 * @title Básica
 * @description Descreva as colunas com `Column` (`label`, `align`, `width`) e as linhas com `Row` e `Cell`; `caption` vira a legenda.
 */
"use client";

import { Badge, Cell, Column, Row, Stack, Table } from "@phsa.tec/design-system-react/react";

const invoices = [
  { id: "NF-2041", customer: "Mercado Bom Preço", status: "Paga", total: "R$ 1.250,00" },
  { id: "NF-2042", customer: "Auto Peças Silva", status: "Em aberto", total: "R$ 780,50" },
  { id: "NF-2043", customer: "Farmácia Saúde+", status: "Paga", total: "R$ 3.420,90" },
  { id: "NF-2044", customer: "Padaria Pão Quente", status: "Vencida", total: "R$ 215,00" },
];

const statusVariant = { Paga: "success", "Em aberto": "warning", Vencida: "destructive" } as const;

export default function TableBasic() {
  return (
    <Stack maxWidth="2xl">
      <Table caption="Notas fiscais emitidas em outubro">
        <Column label="Nota" width="7rem" />
        <Column label="Cliente" />
        <Column label="Status" />
        <Column label="Total" align="right" />
        {invoices.map((invoice) => (
          <Row key={invoice.id}>
            <Cell>{invoice.id}</Cell>
            <Cell>{invoice.customer}</Cell>
            <Cell>
              <Badge variant={statusVariant[invoice.status as keyof typeof statusVariant]}>
                {invoice.status}
              </Badge>
            </Cell>
            <Cell>{invoice.total}</Cell>
          </Row>
        ))}
      </Table>
    </Stack>
  );
}
