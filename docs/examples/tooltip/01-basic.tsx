/**
 * @title Básico
 * @description `text` é a dica; ela aparece no hover e no foco do elemento com `slot="trigger"`.
 */
"use client";

import { Button, Tooltip } from "@phsa.tec/design-system-react/react";

export default function TooltipBasic() {
  return (
    <Tooltip text="Salva sem publicar">
      <Button slot="trigger" type="button" variant="outline">
        Salvar rascunho
      </Button>
    </Tooltip>
  );
}
