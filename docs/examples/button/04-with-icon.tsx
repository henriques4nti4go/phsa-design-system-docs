/**
 * @title Com ícone
 * @description Coloque o `Icon` antes ou depois do texto; o espaçamento é do próprio botão.
 */
"use client";

import { Button, Icon, Stack } from "@phsa.tec/design-system-react/react";
import { Download } from "@phsa.tec/design-system-react/icons/download";
import { Mail } from "@phsa.tec/design-system-react/icons/mail";

export default function ButtonWithIcon() {
  return (
    <Stack direction="row" gap="sm" wrap justify="center">
      <Button>
        <Icon icon={Mail} size="sm" />
        Entrar com e-mail
      </Button>
      <Button variant="outline">
        Baixar relatório
        <Icon icon={Download} size="sm" />
      </Button>
    </Stack>
  );
}
