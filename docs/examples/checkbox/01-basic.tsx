/**
 * @title Básico
 * @description O texto vem de `label` ou dos filhos; clicar no texto também marca a caixa.
 */
"use client";

import { Checkbox, Stack } from "@phsa.tec/design-system-react/react";

export default function CheckboxBasic() {
  return (
    <Stack gap="sm">
      <Checkbox label="Lembrar de mim" />
      <Checkbox checked>Receber ofertas por e-mail</Checkbox>
      <Checkbox label="Nota fiscal em nome da empresa" description="Pediremos o CNPJ no próximo passo." />
    </Stack>
  );
}
