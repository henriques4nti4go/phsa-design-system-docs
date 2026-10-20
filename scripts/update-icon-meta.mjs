// Atualiza docs/icon-meta.json (tags e categorias de cada ícone) a partir do repositório do Lucide.
// O pacote `lucide` só traz o desenho dos ícones; os metadados ficam no repositório.
// Rode quando o DS atualizar o Lucide, com o código-fonte da mesma versão:
//   curl -L https://codeload.github.com/lucide-icons/lucide/tar.gz/refs/tags/<versão> | tar xz -C /tmp
//   node scripts/update-icon-meta.mjs /tmp/lucide-<versão> <versão>
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [repo, version] = process.argv.slice(2);
if (!repo || !version) {
  console.error("Uso: node scripts/update-icon-meta.mjs <pasta do repositório do lucide> <versão>");
  process.exit(1);
}

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const jsonFiles = (dir) => readdirSync(dir).filter((file) => file.endsWith(".json")).sort();

const categories = {};
for (const file of jsonFiles(join(repo, "categories"))) {
  categories[file.replace(/\.json$/, "")] = readJson(join(repo, "categories", file)).title;
}

const icons = {};
for (const file of jsonFiles(join(repo, "icons"))) {
  const meta = readJson(join(repo, "icons", file));
  // Nomes antigos (aliases) também servem de busca: quem procura `trash-2` acha o `trash`.
  const aliases = (meta.aliases ?? []).map((alias) => (typeof alias === "string" ? alias : alias.name));
  icons[file.replace(/\.json$/, "")] = {
    tags: [...new Set([...(meta.tags ?? []), ...aliases])],
    categories: meta.categories ?? [],
  };
}

const out = resolve(import.meta.dirname, "../docs/icon-meta.json");
writeFileSync(out, `${JSON.stringify({ version, categories, icons })}\n`);
console.log(`update-icon-meta: ${Object.keys(icons).length} ícones, ${Object.keys(categories).length} categorias (Lucide ${version})`);
