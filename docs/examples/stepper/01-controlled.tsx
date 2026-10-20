/**
 * @title Com botões de navegação
 * @description Controle a etapa ativa com `value` e acompanhe os cliques nas etapas pelo `onPhsaChange`; as anteriores aparecem como concluídas.
 */
"use client";

import { useState } from "react";
import { Button, Stack, Step, Stepper, Text } from "@phsa.tec/design-system-react/react";

const steps = [
  { value: "carrinho", heading: "Carrinho", description: "Revise os itens" },
  { value: "entrega", heading: "Entrega", description: "Endereço e frete" },
  { value: "pagamento", heading: "Pagamento", description: "Pix ou cartão" },
];

const valueOf = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;

export default function StepperControlled() {
  const [current, setCurrent] = useState(0);
  const isLast = current === steps.length - 1;

  return (
    <Stack maxWidth="2xl" gap="lg">
      <Stepper
        value={steps[current].value}
        onPhsaChange={(e) => setCurrent(steps.findIndex((step) => step.value === valueOf(e)))}
      >
        {steps.map(({ value, heading, description }) => (
          <Step key={value} value={value} heading={heading} description={description} />
        ))}
      </Stepper>
      <Stack background="muted" padding="lg" radius="md">
        <Text>Etapa {current + 1} de {steps.length}: {steps[current].description}.</Text>
      </Stack>
      <Stack direction="row" gap="sm" justify="between">
        <Button variant="outline" disabled={current === 0} onClick={() => setCurrent((i) => i - 1)}>
          Voltar
        </Button>
        <Button disabled={isLast} onClick={() => setCurrent((i) => i + 1)}>
          {isLast ? "Finalizar pedido" : "Continuar"}
        </Button>
      </Stack>
    </Stack>
  );
}
