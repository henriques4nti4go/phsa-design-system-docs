/**
 * @title Busca sem resultado
 * @description O slot `icon` troca a ilustração e o slot `actions` recebe os botões para o próximo passo.
 */
"use client";

import { Button, EmptyState, Icon, Stack } from "@phsa.tec/design-system-react/react";
import { SearchX } from "@phsa.tec/design-system-react/icons/search-x";

export default function EmptyStateSearch() {
  return (
    <Stack maxWidth="xl">
      <EmptyState
        heading="Nenhum produto encontrado"
        description="Não achamos nada para “geladeira frost free 500 litros”. Confira a grafia ou use termos mais gerais."
      >
        <Icon slot="icon" icon={SearchX} size="lg" />
        <Button slot="actions" variant="outline">
          Limpar filtros
        </Button>
      </EmptyState>
    </Stack>
  );
}
