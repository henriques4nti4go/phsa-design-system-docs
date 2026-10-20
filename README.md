# PHSA Design System — Docs

Site de documentação do [PHSA Design System](https://github.com/henriques4nti4go/phsa-design-system) (`@phsa.tec/design-system-react`): página inicial e `/components`, com exemplos ao vivo, código para copiar, como importar e a API de cada componente.

Feito com Next.js 16 e React 19, usando o próprio design system publicado no npm.

## Rodando

```bash
yarn install
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000).

| Script | O que faz |
| --- | --- |
| `yarn dev` | Gera o índice dos exemplos e os dados dos ícones e sobe o servidor de desenvolvimento. |
| `yarn build` | Gera o índice dos exemplos e os dados dos ícones e faz o build de produção. |
| `yarn start` | Serve o build de produção. |
| `yarn lint` | Roda o ESLint. |
| `yarn examples` | Só gera o índice dos exemplos (`docs/examples/index.ts`). |
| `yarn icons` | Só gera os dados da página de ícones (`public/icons.json`). |
| `yarn ds` | Usa o design system local no lugar do publicado (veja abaixo). |

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial do design system. |
| `/components` | Visão geral de todos os componentes, por categoria. |
| `/components/[slug]` | Página de um componente: exemplos, código, import e API. |
| `/icons` | Todos os ícones, com busca, categorias e o import de cada um. |
| `/playground/<exemplo>` | Telas completas feitas só com componentes do DS: `dashboard`, `tarefas`, `configuracoes`, `checkout`, `formularios` e `login` (`/playground` abre a primeira). |

Os exemplos do playground ficam em `app/(site)/playground/<exemplo>/page.tsx`, e as abas vêm de `site/playground.ts`. O CSS global do app tem regras hostis de propósito (`button` rosa, `svg` verde): elas não podem afetar os componentes.

## Estrutura

```
app/                 rotas (App Router)
  (site)/            página inicial, /components e /playground, com o header do site
docs/
  catalog.ts         lista de componentes: nome, categoria, resumo e ordem na barra lateral
  server.ts          lê a API do custom-elements.json do pacote e os arquivos de exemplo
  examples/<slug>/   um arquivo por exemplo
  icon-meta.json     tags e categorias dos ícones do Lucide
site/                componentes do site (header, barra lateral, bloco de código, sumário…)
scripts/
  gen-examples.mjs   gera docs/examples/index.ts
  gen-icons.mjs      gera public/icons.json (yarn icons)
  update-icon-meta.mjs  atualiza docs/icon-meta.json a partir do repositório do Lucide
  sync-ds.mjs        instala o design system local (yarn ds)
```

A tabela de API de cada página (atributos, propriedades, eventos, métodos, slots e parts) vem do `custom-elements.json` do pacote instalado. Quando o design system muda, a documentação acompanha sem editar nada aqui.

## Adicionando um exemplo

Crie um arquivo em `docs/examples/<slug>/`, numerado na ordem em que deve aparecer na página:

```tsx
// docs/examples/button/06-disabled.tsx
/**
 * @title Desabilitado
 * @description `disabled` impede o clique e deixa o botão apagado.
 */
"use client";

import { Button } from "@phsa.tec/design-system-react/react";

export default function ButtonDisabled() {
  return <Button disabled>Desabilitado</Button>;
}
```

O `@title` e o `@description` viram o título e o texto do exemplo, e o resto do arquivo é mostrado como código. O `yarn dev` e o `yarn build` regeneram o índice; com o servidor já rodando, use `yarn examples`.

Para um componente novo, adicione também uma entrada em `docs/catalog.ts`. O `slug` é o nome da pasta do componente no design system e do entry point do import.

## Ícones

A página `/icons` lê o desenho de cada ícone dos arquivos `dist/icons` do pacote instalado e junta com as tags e categorias do Lucide, que ficam em `docs/icon-meta.json` (o pacote `lucide` não traz esses dados). Quando o DS atualizar o Lucide, atualize os metadados com o código-fonte da mesma versão:

```bash
curl -L https://codeload.github.com/lucide-icons/lucide/tar.gz/refs/tags/<versão> | tar xz -C /tmp
node scripts/update-icon-meta.mjs /tmp/lucide-<versão> <versão>
```

O `yarn icons` avisa quando há ícones sem metadados.

## Testando mudanças do design system antes de publicar

Com o repositório do design system em `../phsa-design-system`:

```bash
yarn ds        # faz o build do DS, empacota e instala em node_modules
yarn dev       # reinicie o servidor depois
```

O `yarn ds` instala o pacote como o `npm publish` faria, e um `yarn install` depois volta para a versão do npm. Não use `link:` nem `file:` apontando para a pasta do DS: o app passa a carregar dois Reacts e quebra com "Invalid hook call".
