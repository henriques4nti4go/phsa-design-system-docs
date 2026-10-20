/**
 * @title Vertical
 * @description `orientation="vertical"` empilha as etapas; o texto do `Step` substitui o `description`, e `disabled` bloqueia uma etapa.
 */
"use client";

import { Stack, Step, Stepper } from "@phsa.tec/design-system-react/react";

export default function StepperVertical() {
  return (
    <Stack maxWidth="sm">
      <Stepper orientation="vertical" value="documentos">
        <Step value="cadastro" heading="Cadastro">
          Dados pessoais enviados em 10/03.
        </Step>
        <Step value="documentos" heading="Documentos">
          Envie uma foto do RG ou da CNH.
        </Step>
        <Step value="analise" heading="Análise" disabled>
          Leva até 2 dias úteis.
        </Step>
      </Stepper>
    </Stack>
  );
}
