// Gera public/icons.json para a página /icons: o desenho de cada ícone (dos arquivos
// dist/icons do pacote instalado) junto com as tags e categorias de docs/icon-meta.json.
// Um arquivo só, carregado só nessa página: importar os 1.900 módulos deixaria tudo lento.
// Roda no `yarn dev` e no `yarn build`.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dir = resolve(root, "node_modules/@phsa.tec/design-system-react/dist/icons");
const meta = JSON.parse(readFileSync(resolve(root, "docs/icon-meta.json"), "utf8"));

const icons = readdirSync(dir)
  .filter((file) => file.endsWith(".js"))
  .sort()
  .map((file) => {
    const name = file.replace(/\.js$/, "");
    // Cada arquivo é `export const Nome = [...];`, gerado pelo scripts/build-icons.mjs do DS.
    const match = readFileSync(resolve(dir, file), "utf8").match(/export const (\w+) = (\[.*\]);/);
    if (!match) throw new Error(`gen-icons: formato inesperado em ${file}`);
    const info = meta.icons[name] ?? { tags: [], categories: [] };
    return { name, exportName: match[1], tags: info.tags, categories: info.categories, node: JSON.parse(match[2]) };
  });

writeFileSync(resolve(root, "public/icons.json"), JSON.stringify({ categories: meta.categories, icons }));
const missing = icons.filter((icon) => !meta.icons[icon.name]).length;
console.log(`gen-icons: ${icons.length} ícones${missing ? ` (${missing} sem metadados: rode scripts/update-icon-meta.mjs)` : ""}`);
