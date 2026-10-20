/**
 * @title Básico
 * @description Cada `BreadcrumbItem` com `href` vira link; marque a página atual com `current`.
 */
"use client";

import { Breadcrumb, BreadcrumbItem } from "@phsa.tec/design-system-react/react";

export default function BreadcrumbBasic() {
  return (
    // O clique nos links sobe até o Breadcrumb: aqui, só para o exemplo não sair da página.
    <Breadcrumb onClick={(e) => e.preventDefault()}>
      <BreadcrumbItem href="#">Início</BreadcrumbItem>
      <BreadcrumbItem href="#">Eletrônicos</BreadcrumbItem>
      <BreadcrumbItem href="#">Celulares</BreadcrumbItem>
      <BreadcrumbItem current>Smartphone 128 GB</BreadcrumbItem>
    </Breadcrumb>
  );
}
