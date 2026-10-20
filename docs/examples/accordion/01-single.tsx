/**
 * @title Um por vez
 * @description No tipo `single` (padrão) só um item fica aberto; `value` define qual começa aberto.
 */
"use client";

import { Accordion, AccordionItem, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function AccordionSingle() {
  return (
    <Stack maxWidth="lg">
      <Accordion value="prazo">
        <AccordionItem value="prazo" heading="Qual o prazo de entrega?">
          <Text>Capitais recebem em até 3 dias úteis; demais cidades, em até 7.</Text>
        </AccordionItem>
        <AccordionItem value="troca" heading="Posso trocar um produto?">
          <Text>Sim, em até 30 dias após o recebimento, com a nota fiscal.</Text>
        </AccordionItem>
        <AccordionItem value="pagamento" heading="Quais formas de pagamento são aceitas?">
          <Text>Pix, boleto e cartão de crédito em até 12x sem juros.</Text>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
