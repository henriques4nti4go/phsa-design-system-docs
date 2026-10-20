/**
 * @title Primeiro uso
 * @description Os filhos sem slot entram abaixo da descrição, bom para dicas; várias ações lado a lado no slot `actions`.
 */
"use client";

import { Button, EmptyState, Icon, Stack, Text } from "@phsa.tec/design-system-react/react";
import { FolderOpen } from "@phsa.tec/design-system-react/icons/folder-open";
import { Upload } from "@phsa.tec/design-system-react/icons/upload";

export default function EmptyStateFirstUse() {
  return (
    <Stack maxWidth="xl">
      <EmptyState heading="Nenhum documento ainda" description="Envie notas fiscais e comprovantes para organizar a contabilidade do mês.">
        <Icon slot="icon" icon={FolderOpen} size="lg" />
        <Text variant="small" tone="muted">
          Formatos aceitos: PDF, XML e JPG, até 10 MB.
        </Text>
        <Button slot="actions">
          <Icon icon={Upload} />
          Enviar arquivos
        </Button>
        <Button slot="actions" variant="ghost">
          Ver tutorial
        </Button>
      </EmptyState>
    </Stack>
  );
}
