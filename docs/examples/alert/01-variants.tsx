/**
 * @title Variantes
 * @description `variant` define a cor e o ícone; `destructive` e `warning` são anunciados na hora pelos leitores de tela.
 */
"use client";

import { Alert, Stack } from "@phsa.tec/design-system-react/react";

export default function AlertVariants() {
  return (
    <Stack maxWidth="md" gap="md">
      <Alert heading="Novidade" description="Agora você pode exportar relatórios em PDF." />
      <Alert variant="info" heading="Manutenção programada" description="O sistema ficará fora do ar domingo, das 2h às 4h." />
      <Alert variant="success" heading="Pagamento confirmado" description="O boleto foi compensado e o pedido já está em separação." />
      <Alert variant="warning" heading="Certificado vencendo" description="Seu certificado digital expira em 7 dias." />
      <Alert variant="destructive" heading="Falha na sincronização" description="Não foi possível enviar as notas fiscais. Tente novamente." />
    </Stack>
  );
}
