/**
 * @title Atualizando
 * @description Atualize `value` conforme o trabalho avança; a barra anima a transição sozinha.
 */
"use client";

import { useEffect, useState } from "react";
import { Button, Progress, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function ProgressAnimated() {
  const [value, setValue] = useState(0);
  const running = value > 0 && value < 100;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setValue((current) => Math.min(current + 10, 100)), 300);
    return () => clearTimeout(timer);
  }, [running, value]);

  return (
    <Stack maxWidth="sm" gap="md">
      <Progress value={value} label="Importação de contatos" />
      <Stack direction="row" justify="between" align="center">
        <Text variant="small" tone="muted">
          {value === 100 ? "Importação concluída" : `${value}% importado`}
        </Text>
        <Button type="button" size="sm" variant="outline" disabled={running} onClick={() => setValue(10)}>
          {value === 100 ? "Importar de novo" : "Importar contatos"}
        </Button>
      </Stack>
    </Stack>
  );
}
