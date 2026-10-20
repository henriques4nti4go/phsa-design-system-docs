/**
 * @title Controlado
 * @description Leia `checked` no `onChange` e reaja na interface assim que o usuário alternar.
 */
"use client";

import { useState } from "react";
import { Stack, Switch, Text } from "@phsa.tec/design-system-react/react";

export default function SwitchControlled() {
  const [backup, setBackup] = useState(true);

  return (
    <Stack gap="sm" align="center">
      <Switch
        label="Backup automático"
        checked={backup}
        onChange={(e) => setBackup((e.target as HTMLInputElement).checked)}
      />
      <Text tone={backup ? "success" : "muted"}>
        {backup ? "Seus arquivos são copiados todo dia às 3h." : "Backup desligado."}
      </Text>
    </Stack>
  );
}
