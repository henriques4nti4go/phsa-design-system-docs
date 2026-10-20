/**
 * @title Com ícone
 * @description O rótulo do item aceita qualquer conteúdo, como um `Icon` para a página inicial; dê um `label` ao ícone quando ele estiver sozinho.
 */
"use client";

import { Breadcrumb, BreadcrumbItem, Icon } from "@phsa.tec/design-system-react/react";
import { House } from "@phsa.tec/design-system-react/icons/house";

export default function BreadcrumbWithIcon() {
  return (
    <Breadcrumb label="Você está em" onClick={(e) => e.preventDefault()}>
      <BreadcrumbItem href="#">
        <Icon icon={House} size="sm" label="Início" />
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Pedidos</BreadcrumbItem>
      <BreadcrumbItem current>Pedido #10482</BreadcrumbItem>
    </Breadcrumb>
  );
}
