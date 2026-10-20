/**
 * @title Link externo
 * @description Com `target="_blank"` o link abre em outra aba e recebe `rel="noopener noreferrer"` sozinho.
 */
"use client";

import { Icon, Link } from "@phsa.tec/design-system-react/react";
import { ExternalLink } from "@phsa.tec/design-system-react/icons/external-link";

export default function LinkExternal() {
  return (
    <Link href="https://www.gov.br/receitafederal" target="_blank">
      Consultar CPF na Receita Federal <Icon icon={ExternalLink} size="xs" />
    </Link>
  );
}
