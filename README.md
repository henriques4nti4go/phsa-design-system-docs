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
| `yarn dev` | Gera o índice dos exemplos e sobe o servidor de desenvolvimento. |
| `yarn build` | Gera o índice dos exemplos e faz o build de produção. |
| `yarn start` | Serve o build de produção. |
| `yarn lint` | Roda o ESLint. |
| `yarn examples` | Só gera o índice dos exemplos (`docs/examples/index.ts`). |
| `yarn ds` | Usa o design system local no lugar do publicado (veja abaixo). |

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial do design system. |
| `/components` | Visão geral de todos os componentes, por categoria. |
| `/components/[slug]` | Página de um componente: exemplos, código, import e API. |
| `/playground` | Página de testes com vários componentes juntos e CSS global hostil. |
| `/login` | Exemplo de tela de login feita só com componentes do DS. |

## Estrutura

```
app/                 rotas (App Router)
  (site)/            página inicial e /components, com o header e a barra lateral
docs/
  catalog.ts         lista de componentes: nome, categoria, resumo e ordem na barra lateral
  server.ts          lê a API do custom-elements.json do pacote e os arquivos de exemplo
  examples/<slug>/   um arquivo por exemplo
site/                componentes do site (header, barra lateral, bloco de código, sumário…)
scripts/
  gen-examples.mjs   gera docs/examples/index.ts
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

## Testando mudanças do design system antes de publicar

Com o repositório do design system em `../phsa-design-system`:

```bash
yarn ds        # faz o build do DS, empacota e instala em node_modules
yarn dev       # reinicie o servidor depois
```

O `yarn ds` instala o pacote como o `npm publish` faria, e um `yarn install` depois volta para a versão do npm. Não use `link:` nem `file:` apontando para a pasta do DS: o app passa a carregar dois Reacts e quebra com "Invalid hook call".
