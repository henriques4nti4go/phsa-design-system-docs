/**
 * @title Desabilitada
 * @description `disabled` bloqueia todos os controles, por exemplo enquanto a próxima página carrega.
 */
"use client";

import { Pagination } from "@phsa.tec/design-system-react/react";

export default function PaginationDisabled() {
  return <Pagination page={3} pageCount={8} disabled />;
}
