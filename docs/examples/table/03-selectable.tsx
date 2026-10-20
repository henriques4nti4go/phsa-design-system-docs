/**
 * @title Seleção de linhas
 * @description `selectable` adiciona as caixas de seleção; cada `Row` precisa de um `value`, e `onPhsaSelectionChange` entrega `detail.values`.
 */
"use client";

import { useState } from "react";
import { Button, Cell, Column, Row, Stack, Table, Text } from "@phsa.tec/design-system-react/react";

const users = [
  { id: "u1", name: "Fernanda Lima", email: "fernanda@empresa.com.br", role: "Administradora" },
  { id: "u2", name: "Thiago Rocha", email: "thiago@empresa.com.br", role: "Editor" },
  { id: "u3", name: "Larissa Mendes", email: "larissa@empresa.com.br", role: "Leitora" },
  { id: "u4", name: "Bruno Carvalho", email: "bruno@empresa.com.br", role: "Proprietário" },
];

export default function TableSelectable() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Stack maxWidth="2xl" gap="sm">
      <Stack direction="row" align="center" justify="between" gap="sm">
        <Text variant="small" tone="muted">
          {selected.length} de {users.length} selecionados
        </Text>
        <Button variant="destructive" size="sm" disabled={!selected.length}>
          Remover acesso
        </Button>
      </Stack>
      <Table
        selectable
        onPhsaSelectionChange={(event) => setSelected((event as CustomEvent<{ values: string[] }>).detail.values)}
      >
        <Column label="Nome" />
        <Column label="E-mail" />
        <Column label="Papel" />
        {users.map((user) => (
          <Row key={user.id} value={user.id} disabled={user.role === "Proprietário"}>
            <Cell>{user.name}</Cell>
            <Cell>{user.email}</Cell>
            <Cell>{user.role}</Cell>
          </Row>
        ))}
      </Table>
    </Stack>
  );
}
