/**
 * @title Variantes e tamanhos
 * @description `variant="outline"` desenha a borda e `size` vai de `sm` a `lg`; com só o ícone, dê um `label` ao `Icon`.
 */
"use client";

import { Icon, Stack, Toggle } from "@phsa.tec/design-system-react/react";
import { Bold } from "@phsa.tec/design-system-react/icons/bold";

export default function ToggleVariantsSizes() {
  return (
    <Stack gap="md" align="center">
      <Stack direction="row" gap="sm" align="center" wrap justify="center">
        <Toggle size="sm">
          <Icon icon={Bold} label="Negrito" />
        </Toggle>
        <Toggle pressed>
          <Icon icon={Bold} label="Negrito" />
        </Toggle>
        <Toggle size="lg">
          <Icon icon={Bold} label="Negrito" />
        </Toggle>
      </Stack>
      <Stack direction="row" gap="sm" align="center" wrap justify="center">
        <Toggle variant="outline" size="sm">Pequeno</Toggle>
        <Toggle variant="outline" pressed>Padrão</Toggle>
        <Toggle variant="outline" size="lg">Grande</Toggle>
        <Toggle variant="outline" disabled>Desabilitado</Toggle>
      </Stack>
    </Stack>
  );
}
