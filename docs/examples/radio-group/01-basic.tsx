/**
 * @title Básico
 * @description Cada opção é um `Radio` com o seu `value`; o `value` do grupo diz qual começa marcada. As setas do teclado trocam a seleção.
 */
"use client";

import { Radio, RadioGroup } from "@phsa.tec/design-system-react/react";

export default function RadioGroupBasic() {
  return (
    <RadioGroup label="Forma de entrega" value="padrao">
      <Radio value="padrao">Padrão (5 a 8 dias úteis)</Radio>
      <Radio value="expressa">Expressa (1 a 2 dias úteis)</Radio>
      <Radio value="retirada">Retirar na loja</Radio>
    </RadioGroup>
  );
}
