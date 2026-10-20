/**
 * @title Vertical
 * @description `orientation="vertical"` coloca as abas em coluna ao lado do painel; as setas para cima e para baixo trocam de aba.
 */
"use client";

import { Stack, Tab, TabPanel, Tabs, Text } from "@phsa.tec/design-system-react/react";

export default function TabsVertical() {
  return (
    <Stack maxWidth="lg">
      <Tabs orientation="vertical">
        <Tab slot="tab" value="perfil">
          Perfil
        </Tab>
        <Tab slot="tab" value="notificacoes">
          Notificações
        </Tab>
        <Tab slot="tab" value="pagamento">
          Pagamento
        </Tab>
        <TabPanel value="perfil">
          <Stack gap="xs">
            <Text variant="h4">Perfil</Text>
            <Text tone="muted">Foto, nome de exibição e bio.</Text>
          </Stack>
        </TabPanel>
        <TabPanel value="notificacoes">
          <Stack gap="xs">
            <Text variant="h4">Notificações</Text>
            <Text tone="muted">Escolha o que chega por e-mail e por WhatsApp.</Text>
          </Stack>
        </TabPanel>
        <TabPanel value="pagamento">
          <Stack gap="xs">
            <Text variant="h4">Pagamento</Text>
            <Text tone="muted">Cartões salvos e chave Pix para reembolsos.</Text>
          </Stack>
        </TabPanel>
      </Tabs>
    </Stack>
  );
}
