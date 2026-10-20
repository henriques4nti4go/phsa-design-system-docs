/**
 * @title Controlado
 * @description Passe `value` e atualize-o no `onPhsaChange`, que traz a aba escolhida em `detail.value`.
 */
"use client";

import { useState } from "react";
import { Button, Stack, Tab, TabPanel, Tabs, Text } from "@phsa.tec/design-system-react/react";

const valueOf = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;

export default function TabsControlled() {
  const [tab, setTab] = useState("conta");

  return (
    <Stack maxWidth="md" gap="md">
      <Tabs value={tab} onPhsaChange={(e) => setTab(valueOf(e))}>
        <Tab slot="tab" value="conta">
          Conta
        </Tab>
        <Tab slot="tab" value="seguranca">
          Segurança
        </Tab>
        <TabPanel value="conta">
          <Text>Nome, e-mail e telefone de contato.</Text>
        </TabPanel>
        <TabPanel value="seguranca">
          <Text>Senha e verificação em duas etapas.</Text>
        </TabPanel>
      </Tabs>
      <Stack direction="row" gap="sm" align="center" justify="between">
        <Text variant="small" tone="muted">
          Aba ativa: {tab}
        </Text>
        <Button size="sm" variant="outline" onClick={() => setTab("seguranca")}>
          Ir para Segurança
        </Button>
      </Stack>
    </Stack>
  );
}
