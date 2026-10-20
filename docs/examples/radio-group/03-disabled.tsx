/**
 * @title Desabilitado
 * @description `disabled` no `Radio` bloqueia só aquela opção; no `RadioGroup`, bloqueia todas.
 */
"use client";

import { Radio, RadioGroup, Stack } from "@phsa.tec/design-system-react/react";

export default function RadioGroupDisabled() {
  return (
    <Stack direction="row" gap="xl" wrap justify="center">
      <RadioGroup label="Horário de entrega" value="manha">
        <Radio value="manha">Manhã</Radio>
        <Radio value="tarde">Tarde</Radio>
        <Radio value="noite" disabled>
          Noite (esgotado)
        </Radio>
      </RadioGroup>
      <RadioGroup label="Plano atual" value="pro" disabled>
        <Radio value="basico">Básico</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>
    </Stack>
  );
}
