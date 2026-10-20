/**
 * @title Grupo de várias escolhas
 * @description Com `type="multiple"`, o `value` lista os itens ativos separados por vírgula.
 */
"use client";

import { useState } from "react";
import { Stack, Text, Toggle, ToggleGroup } from "@phsa.tec/design-system-react/react";

export default function ToggleGroupMultiple() {
  const [days, setDays] = useState("seg,qua,sex");

  return (
    <Stack gap="sm" align="center">
      <ToggleGroup
        type="multiple"
        value={days}
        onPhsaChange={(event) => setDays((event as CustomEvent<{ value: string }>).detail.value)}
      >
        <Toggle variant="outline" value="seg">Seg</Toggle>
        <Toggle variant="outline" value="ter">Ter</Toggle>
        <Toggle variant="outline" value="qua">Qua</Toggle>
        <Toggle variant="outline" value="qui">Qui</Toggle>
        <Toggle variant="outline" value="sex">Sex</Toggle>
      </ToggleGroup>
      <Text variant="small" tone="muted">
        Dias de entrega: {days || "nenhum"}
      </Text>
    </Stack>
  );
}
