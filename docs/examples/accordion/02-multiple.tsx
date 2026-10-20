/**
 * @title Vários abertos
 * @description Com `type="multiple"`, `value` lista os itens abertos separados por vírgula; `onPhsaChange` traz a lista nova em `detail.value`.
 */
"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Stack, Text } from "@phsa.tec/design-system-react/react";

const valueOf = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;

export default function AccordionMultiple() {
  const [open, setOpen] = useState("dados");

  return (
    <Stack maxWidth="lg" gap="md">
      <Accordion type="multiple" value={open} onPhsaChange={(e) => setOpen(valueOf(e))}>
        <AccordionItem value="dados" heading="Dados da empresa">
          <Text>Razão social, CNPJ e inscrição estadual.</Text>
        </AccordionItem>
        <AccordionItem value="endereco" heading="Endereço">
          <Text>Rua, número, bairro, cidade e CEP.</Text>
        </AccordionItem>
        <AccordionItem value="faturamento" heading="Faturamento" disabled>
          <Text>Disponível depois de validar o CNPJ.</Text>
        </AccordionItem>
      </Accordion>
      <Text variant="small" tone="muted">
        Abertos: {open || "nenhum"}
      </Text>
    </Stack>
  );
}
