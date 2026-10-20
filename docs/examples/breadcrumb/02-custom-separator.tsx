/**
 * @title Separador customizado
 * @description O slot `separator` de cada item troca a seta padrão; o separador do primeiro item fica escondido.
 */
"use client";

import { Breadcrumb, BreadcrumbItem, Icon } from "@phsa.tec/design-system-react/react";
import { Slash } from "@phsa.tec/design-system-react/icons/slash";

const separator = <Icon slot="separator" icon={Slash} size="xs" />;

export default function BreadcrumbCustomSeparator() {
  return (
    <Breadcrumb onClick={(e) => e.preventDefault()}>
      <BreadcrumbItem href="#">Conta</BreadcrumbItem>
      <BreadcrumbItem href="#">
        {separator}
        Configurações
      </BreadcrumbItem>
      <BreadcrumbItem current>
        {separator}
        Notificações
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
