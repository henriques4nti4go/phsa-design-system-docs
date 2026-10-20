/**
 * @title Tons
 * @description `tone` usa as cores do tema; sem ele, o ícone herda a cor do texto. Com `label`, deixa de ser decorativo e é lido pelos leitores de tela.
 */
"use client";

import { Icon, Stack } from "@phsa.tec/design-system-react/react";
import { CircleCheck } from "@phsa.tec/design-system-react/icons/circle-check";
import { Info } from "@phsa.tec/design-system-react/icons/info";
import { Star } from "@phsa.tec/design-system-react/icons/star";
import { TriangleAlert } from "@phsa.tec/design-system-react/icons/triangle-alert";
import { X } from "@phsa.tec/design-system-react/icons/x";

export default function IconTones() {
  return (
    <Stack direction="row" gap="md" wrap justify="center">
      <Icon icon={Star} size="lg" tone="muted" label="Sem destaque" />
      <Icon icon={Star} size="lg" tone="primary" label="Destaque" />
      <Icon icon={CircleCheck} size="lg" tone="success" label="Sucesso" />
      <Icon icon={TriangleAlert} size="lg" tone="warning" label="Atenção" />
      <Icon icon={X} size="lg" tone="destructive" label="Erro" />
      <Icon icon={Info} size="lg" tone="info" label="Informação" />
    </Stack>
  );
}
