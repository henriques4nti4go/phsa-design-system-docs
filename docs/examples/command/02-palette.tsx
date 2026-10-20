/**
 * @title Paleta de comandos
 * @description Coloque o `Command` dentro de um `Dialog` e abra com Ctrl+K (ou ⌘K) para ter uma paleta de comandos.
 */
"use client";

import { useEffect, useState } from "react";
import { Button, Command, CommandGroup, CommandItem, Dialog } from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const select = (e: Event) => {
    setOpen(false);
    toast(`Comando: ${(e as CustomEvent<{ value: string }>).detail.value}`);
  };

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Buscar… Ctrl+K
      </Button>

      <Dialog open={open} heading="Paleta de comandos" onClose={() => setOpen(false)}>
        {/* Remonta a cada abertura para começar com a busca vazia. */}
        {open && (
          <Command placeholder="O que você quer fazer?" onPhsaSelect={select}>
            <CommandGroup label="Sugestões">
              <CommandItem value="calendario">Abrir calendário</CommandItem>
              <CommandItem value="tema">Alternar tema escuro</CommandItem>
              <CommandItem value="atalhos">Ver atalhos de teclado</CommandItem>
            </CommandGroup>
            <CommandGroup label="Conta">
              <CommandItem value="perfil">Perfil</CommandItem>
              <CommandItem value="sair">Sair</CommandItem>
            </CommandGroup>
          </Command>
        )}
      </Dialog>
    </>
  );
}
