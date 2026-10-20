/**
 * @title Links e painéis
 * @description Item com `href` é um link (marque a página atual com `current`); sem `href`, o conteúdo vira um painel que abre ao passar o mouse ou clicar.
 */
"use client";

import { Link, NavigationMenu, NavigationMenuItem, Stack } from "@phsa.tec/design-system-react/react";

export default function NavigationMenuBasic() {
  return (
    // O clique nos links sobe até o NavigationMenu: aqui, só para o exemplo não sair da página.
    <NavigationMenu onClick={(e) => e.preventDefault()}>
      <NavigationMenuItem href="#" current>
        Início
      </NavigationMenuItem>
      <NavigationMenuItem label="Serviços">
        <Stack gap="sm">
          <Link href="#">Abertura de empresa</Link>
          <Link href="#">Contabilidade mensal</Link>
          <Link href="#">Folha de pagamento</Link>
        </Stack>
      </NavigationMenuItem>
      <NavigationMenuItem label="Ajuda">
        <Stack gap="sm">
          <Link href="#">Central de ajuda</Link>
          <Link href="#">Fale conosco</Link>
        </Stack>
      </NavigationMenuItem>
      <NavigationMenuItem href="#">Preços</NavigationMenuItem>
    </NavigationMenu>
  );
}
