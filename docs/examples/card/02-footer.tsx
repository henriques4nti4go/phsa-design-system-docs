/**
 * @title Com rodapé
 * @description O slot `footer` recebe as ações; agrupe vários botões num `Stack` em linha.
 */
"use client";

import { Button, Card, Input, Stack } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function CardFooter() {
  return (
    <Stack maxWidth="sm">
      <Card heading="Dados de contato" description="Usados para avisos sobre a sua conta.">
        <Stack gap="md">
          <Input label="Nome completo" value="Mariana Costa" />
          <Input label="Celular" type="tel" value="(11) 98765-4321" />
        </Stack>
        <Stack slot="footer" direction="row" gap="sm" justify="end" grow>
          <Button variant="outline">Cancelar</Button>
          <Button onClick={() => toast("Contato atualizado.")}>Salvar</Button>
        </Stack>
      </Card>
    </Stack>
  );
}
