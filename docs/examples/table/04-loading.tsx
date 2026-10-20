/**
 * @title Carregando
 * @description `loading` troca as linhas por skeletons e marca a tabela com `aria-busy`.
 */
"use client";

import { useState } from "react";
import { Button, Cell, Column, Row, Stack, Table } from "@phsa.tec/design-system-react/react";

const transfers = [
  { id: "t1", date: "18/10/2026", description: "Pix recebido — João Pereira", amount: "R$ 350,00" },
  { id: "t2", date: "17/10/2026", description: "Conta de luz — Enel", amount: "-R$ 189,72" },
  { id: "t3", date: "15/10/2026", description: "Salário", amount: "R$ 6.800,00" },
];

export default function TableLoading() {
  const [loading, setLoading] = useState(false);

  const reload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <Stack maxWidth="2xl" gap="sm">
      <Stack direction="row" justify="end">
        <Button variant="outline" size="sm" loading={loading} onClick={reload}>
          Atualizar extrato
        </Button>
      </Stack>
      <Table loading={loading}>
        <Column label="Data" width="8rem" />
        <Column label="Descrição" />
        <Column label="Valor" align="right" />
        {transfers.map((transfer) => (
          <Row key={transfer.id}>
            <Cell>{transfer.date}</Cell>
            <Cell>{transfer.description}</Cell>
            <Cell>{transfer.amount}</Cell>
          </Row>
        ))}
      </Table>
    </Stack>
  );
}
