/**
 * @title Navegação pelo roteador
 * @description Para navegar sem recarregar a página, chame `preventDefault()` no clique e use o roteador do framework; mantenha o `href` para o link continuar acessível.
 */
"use client";

import { useRouter } from "next/navigation";
import { Link } from "@phsa.tec/design-system-react/react";

export default function LinkClientRouting() {
  const router = useRouter();

  return (
    <Link
      href="/components/button"
      onClick={(e) => {
        e.preventDefault();
        router.push("/components/button");
      }}
    >
      Ir para a página do Button
    </Link>
  );
}
