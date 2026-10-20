/**
 * @title Moeda
 * @description `prefix="R$ "` e `decimalScale={2}` formatam o valor como reais enquanto o usuário digita, com `.` no milhar e `,` nos centavos.
 */
"use client";

import { NumericInput, Stack } from "@phsa.tec/design-system-react/react";

export default function NumericInputCurrency() {
  return (
    <Stack maxWidth="sm" gap="md">
      <NumericInput label="Valor do empréstimo" prefix="R$ " decimalScale={2} placeholder="R$ 0,00" value="15000" />
    </Stack>
  );
}
