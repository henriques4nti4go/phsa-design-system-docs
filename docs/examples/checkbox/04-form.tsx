/**
 * @title Em formulário
 * @description Marcada, a caixa envia `value` (padrão `on`) com o seu `name`; desmarcada, fica fora do `FormData`. `required` exige a marcação.
 */
"use client";

import { useState, type FormEvent } from "react";
import { Button, Checkbox, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function CheckboxForm() {
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSent(data.getAll("adicionais").join(", ") || "nenhum adicional");
  };

  return (
    <Stack gap="md">
      <form onSubmit={submit}>
        <Stack gap="sm">
          <Checkbox name="adicionais" value="seguro" label="Seguro contra roubo (R$ 19,90)" />
          <Checkbox name="adicionais" value="garantia" label="Garantia estendida (R$ 49,90)" />
          <Checkbox name="termos" label="Concordo com as condições de compra" required />
          <Button type="submit">Finalizar compra</Button>
        </Stack>
      </form>
      {sent && <Text tone="muted">Enviado: {sent}</Text>}
    </Stack>
  );
}
