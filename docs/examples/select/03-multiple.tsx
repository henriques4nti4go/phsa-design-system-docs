/**
 * @title Múltipla escolha
 * @description Com `multiple`, `value` é a lista separada por vírgula. `maxSelected` limita quantas opções cabem e `maxVisible` quantas etiquetas aparecem no campo.
 */
"use client";

import { useState } from "react";
import { Select, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function SelectMultiple() {
  const [skills, setSkills] = useState("react,typescript");

  return (
    <Stack maxWidth="sm" gap="sm">
      <Select
        label="Habilidades"
        description="Escolha até 4."
        multiple
        maxSelected={4}
        maxVisible={3}
        value={skills}
        onChange={(e) => setSkills((e.target as HTMLSelectElement).value)}
      >
        <option value="react">React</option>
        <option value="typescript">TypeScript</option>
        <option value="node">Node.js</option>
        <option value="python">Python</option>
        <option value="sql">SQL</option>
        <option value="figma">Figma</option>
      </Select>
      <Text variant="small" tone="muted">
        value: &quot;{skills}&quot;
      </Text>
    </Stack>
  );
}
