// Gera docs/examples/index.ts: um import dinâmico por arquivo de exemplo
// (docs/examples/<componente>/<nn-nome>.tsx), para cada página carregar só os seus.
// Roda no `yarn dev` e no `yarn build`; rode `yarn examples` depois de criar um exemplo novo.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const dir = resolve(import.meta.dirname, "../docs/examples");

const keys = readdirSync(dir)
  .filter((name) => statSync(join(dir, name)).isDirectory())
  .sort()
  .flatMap((slug) =>
    readdirSync(join(dir, slug))
      .filter((file) => file.endsWith(".tsx"))
      .sort()
      .map((file) => `${slug}/${file.replace(/\.tsx$/, "")}`),
  );

const lines = [
  "// Gerado por scripts/gen-examples.mjs. Não editar.",
  '"use client";',
  "",
  'import dynamic from "next/dynamic";',
  'import type { ComponentType } from "react";',
  "",
  // Só no cliente, como o `mounted` do playground: table e command não hidratam bem no SSR.
  "export const examples: Record<string, ComponentType> = {",
  ...keys.map((key) => `  "${key}": dynamic(() => import("./${key}"), { ssr: false }),`),
  "};",
  "",
];

writeFileSync(join(dir, "index.ts"), lines.join("\n"));
console.log(`gen-examples: ${keys.length} exemplos.`);
