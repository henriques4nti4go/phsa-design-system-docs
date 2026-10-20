/**
 * @title Em formulário
 * @description O `name` vai no `RadioGroup`, que envia o `value` da opção marcada. Com `required`, o envio sem escolha mostra o erro.
 */
"use client";

import { useState, type FormEvent } from "react";
import { Button, Radio, RadioGroup, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function RadioGroupForm() {
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(String(new FormData(e.currentTarget).get("pagamento")));
  };

  return (
    <Stack gap="md">
      <form onSubmit={submit}>
        <Stack gap="md">
          <RadioGroup name="pagamento" label="Forma de pagamento" required>
            <Radio value="pix">Pix</Radio>
            <Radio value="cartao">Cartão de crédito</Radio>
            <Radio value="boleto">Boleto bancário</Radio>
          </RadioGroup>
          <Button type="submit">Pagar R$ 189,90</Button>
        </Stack>
      </form>
      {sent && <Text tone="muted">Enviado: {sent}</Text>}
    </Stack>
  );
}
