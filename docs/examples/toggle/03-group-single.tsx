/**
 * @title Grupo de escolha única
 * @description No `ToggleGroup`, cada `Toggle` tem um `value`; com `type="single"`, só um fica ativo e clicar de novo desmarca.
 */
"use client";

import { useState } from "react";
import { Icon, Stack, Text, Toggle, ToggleGroup } from "@phsa.tec/design-system-react/react";
import { TextAlignCenter } from "@phsa.tec/design-system-react/icons/text-align-center";
import { TextAlignEnd } from "@phsa.tec/design-system-react/icons/text-align-end";
import { TextAlignStart } from "@phsa.tec/design-system-react/icons/text-align-start";

export default function ToggleGroupSingle() {
  const [align, setAlign] = useState("esquerda");

  return (
    <Stack gap="sm" align="center">
      <ToggleGroup
        type="single"
        value={align}
        onPhsaChange={(event) => setAlign((event as CustomEvent<{ value: string }>).detail.value)}
      >
        <Toggle value="esquerda">
          <Icon icon={TextAlignStart} label="Alinhar à esquerda" />
        </Toggle>
        <Toggle value="centro">
          <Icon icon={TextAlignCenter} label="Centralizar" />
        </Toggle>
        <Toggle value="direita">
          <Icon icon={TextAlignEnd} label="Alinhar à direita" />
        </Toggle>
      </ToggleGroup>
      <Text variant="small" tone="muted">
        Alinhamento: {align || "nenhum"}
      </Text>
    </Stack>
  );
}
