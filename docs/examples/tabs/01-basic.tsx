/**
 * @title Básico
 * @description Cada `Tab` vai no slot `tab` e mostra o `TabPanel` de mesmo `value`; sem `value` no `Tabs`, a primeira aba começa ativa.
 */
"use client";

import { Stack, Tab, TabPanel, Tabs, Text } from "@phsa.tec/design-system-react/react";

export default function TabsBasic() {
  return (
    <Stack maxWidth="md">
      <Tabs>
        <Tab slot="tab" value="resumo">
          Resumo
        </Tab>
        <Tab slot="tab" value="itens">
          Itens
        </Tab>
        <Tab slot="tab" value="entrega" disabled>
          Entrega
        </Tab>
        <TabPanel value="resumo">
          <Text>Pedido #10482 feito em 12/03, pago via Pix.</Text>
        </TabPanel>
        <TabPanel value="itens">
          <Text>2 itens: fone Bluetooth e capa de celular.</Text>
        </TabPanel>
        <TabPanel value="entrega">
          <Text>Previsão de entrega em 3 dias úteis.</Text>
        </TabPanel>
      </Tabs>
    </Stack>
  );
}
