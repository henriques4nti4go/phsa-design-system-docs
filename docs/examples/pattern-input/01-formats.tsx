/**
 * @title Formatos
 * @description `format` define a máscara: `#` é dígito, `A` é letra e `*` aceita os dois; o resto é escrito sozinho.
 */
"use client";

import { PatternInput, Stack } from "@phsa.tec/design-system-react/react";

export default function PatternInputFormats() {
  return (
    <Stack maxWidth="sm" gap="md">
      <PatternInput label="CPF" format="###.###.###-##" placeholder="000.000.000-00" />
      <PatternInput label="Telefone" format="(##) #####-####" placeholder="(00) 00000-0000" />
      <PatternInput label="CEP" format="#####-###" placeholder="00000-000" />
    </Stack>
  );
}
