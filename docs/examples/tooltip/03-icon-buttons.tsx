/**
 * @title Botões de ícone
 * @description O caso mais comum: explicar botões só com ícone. Mantenha o `aria-label`, a dica vira só uma descrição extra.
 */
"use client";

import { Button, Icon, Stack, Tooltip } from "@phsa.tec/design-system-react/react";
import { Copy } from "@phsa.tec/design-system-react/icons/copy";
import { Pencil } from "@phsa.tec/design-system-react/icons/pencil";
import { Trash } from "@phsa.tec/design-system-react/icons/trash";

export default function TooltipIconButtons() {
  return (
    <Stack direction="row" gap="xs" justify="center">
      <Tooltip text="Editar">
        <Button slot="trigger" type="button" size="icon" variant="ghost" aria-label="Editar">
          <Icon icon={Pencil} size="sm" />
        </Button>
      </Tooltip>
      <Tooltip text="Duplicar">
        <Button slot="trigger" type="button" size="icon" variant="ghost" aria-label="Duplicar">
          <Icon icon={Copy} size="sm" />
        </Button>
      </Tooltip>
      <Tooltip text="Excluir">
        <Button slot="trigger" type="button" size="icon" variant="ghost" aria-label="Excluir">
          <Icon icon={Trash} size="sm" />
        </Button>
      </Tooltip>
    </Stack>
  );
}
