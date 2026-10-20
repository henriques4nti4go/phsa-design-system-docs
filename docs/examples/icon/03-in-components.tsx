/**
 * @title Em botões e campos
 * @description Dentro de `Button` o espaçamento é do botão; no `Input`, use `slot="prefix"` ou `slot="suffix"`.
 */
"use client";

import { Button, Icon, Input, Stack } from "@phsa.tec/design-system-react/react";
import { Search } from "@phsa.tec/design-system-react/icons/search";
import { ShoppingCart } from "@phsa.tec/design-system-react/icons/shopping-cart";
import { Trash } from "@phsa.tec/design-system-react/icons/trash";

export default function IconInComponents() {
  return (
    <Stack gap="md" maxWidth="sm">
      <Input label="Buscar produto" placeholder="Ex.: cafeteira elétrica">
        <Icon slot="prefix" icon={Search} tone="muted" />
      </Input>
      <Stack direction="row" gap="sm" wrap justify="center">
        <Button>
          <Icon icon={ShoppingCart} />
          Adicionar ao carrinho
        </Button>
        <Button variant="outline" size="icon" aria-label="Remover item">
          <Icon icon={Trash} />
        </Button>
      </Stack>
    </Stack>
  );
}
