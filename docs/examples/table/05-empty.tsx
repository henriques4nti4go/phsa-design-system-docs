/**
 * @title Sem registros
 * @description Sem linhas, a tabela mostra "Nenhum registro."; o slot `empty` troca essa mensagem por conteúdo próprio.
 */
"use client";

import { Button, Column, Stack, Table, Text } from "@phsa.tec/design-system-react/react";

export default function TableEmpty() {
  return (
    <Stack maxWidth="2xl">
      <Table>
        <Column label="Cliente" />
        <Column label="Cidade" />
        <Column label="Último pedido" />
        <Stack slot="empty" gap="sm" align="center">
          <Text weight="medium" tone="default">Nenhum cliente cadastrado</Text>
          <Text variant="small">Os clientes aparecem aqui depois do primeiro pedido.</Text>
          <Button size="sm">Cadastrar cliente</Button>
        </Stack>
      </Table>
    </Stack>
  );
}
