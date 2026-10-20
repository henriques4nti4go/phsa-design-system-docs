/**
 * @title Tela cheia no celular
 * @description `responsiveFullscreen` faz a janela ocupar a tela toda em telas pequenas e voltar ao tamanho normal no desktop.
 */
"use client";

import { useState } from "react";
import { Button, Dialog, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function DialogResponsiveFullscreen() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Ler os termos de uso
      </Button>

      <Dialog open={open} responsiveFullscreen heading="Termos de uso" description="Versão de 1º de outubro de 2026." onClose={() => setOpen(false)}>
        <Stack gap="sm">
          <Text>1. Ao criar uma conta, você declara que as informações fornecidas são verdadeiras.</Text>
          <Text>2. Seus dados são tratados conforme a Lei Geral de Proteção de Dados (LGPD).</Text>
          <Text>3. Você pode cancelar a assinatura a qualquer momento, sem multa.</Text>
        </Stack>
        <Button slot="footer" type="button" onClick={() => setOpen(false)}>
          Li e concordo
        </Button>
      </Dialog>
    </>
  );
}
