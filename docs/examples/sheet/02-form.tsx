/**
 * @title Com formulário
 * @description O corpo aceita qualquer conteúdo e o slot `footer` fixa as ações no rodapé do painel.
 */
"use client";

import { useState } from "react";
import { Button, Input, Sheet, Stack, Textarea } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function SheetForm() {
  const [open, setOpen] = useState(false);

  const save = () => {
    setOpen(false);
    toast.success("Perfil atualizado");
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Editar perfil
      </Button>

      <Sheet open={open} heading="Editar perfil" description="As mudanças aparecem para toda a equipe." onClose={() => setOpen(false)}>
        <Stack gap="md">
          <Input label="Nome" value="Ana Costa" />
          <Input label="Cargo" value="Designer de produto" />
          <Textarea label="Bio" rows={4} placeholder="Conte um pouco sobre você" />
        </Stack>
        <Button slot="footer" type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button slot="footer" type="button" onClick={save}>
          Salvar
        </Button>
      </Sheet>
    </>
  );
}
