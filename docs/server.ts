// Lê, no servidor, a API dos componentes (custom-elements.json do pacote instalado) e o
// código-fonte dos exemplos em docs/examples. Só roda em Server Components.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { CATALOG, CATEGORIES, type CatalogEntry } from "./catalog";

const PACKAGE = "@phsa.tec/design-system-react";
const packageDir = join(process.cwd(), "node_modules", PACKAGE);
const examplesDir = join(process.cwd(), "docs/examples");

type Field = { name: string; type?: { text: string }; default?: string; description?: string; fieldName?: string };
type Member = Field & { kind: string; privacy?: string; static?: boolean; attribute?: string; parameters?: Field[] };
type Declaration = {
  name: string;
  tagName?: string;
  description?: string;
  attributes?: Field[];
  members?: Member[];
  events?: Field[];
  slots?: Field[];
  cssParts?: Field[];
  cssProperties?: Field[];
};
type Manifest = { modules: { path: string; declarations?: Declaration[] }[] };

export type ApiRow = { name: string; react?: string; type?: string; default?: string; description?: string };

export type ElementApi = {
  tag: string;
  react: string;
  description: string;
  attributes: ApiRow[];
  properties: ApiRow[];
  events: ApiRow[];
  methods: ApiRow[];
  slots: ApiRow[];
  parts: ApiRow[];
};

export type Example = { key: string; title: string; description: string; code: string };

export type ComponentPage = CatalogEntry & {
  categoryLabel: string;
  description: string;
  elements: ElementApi[];
  examples: Example[];
};

const pascal = (text: string) => text.replace(/(^|-)([a-z])/g, (_, __, char: string) => char.toUpperCase());

// Mesmas regras do scripts/build-react.mjs do DS: eventos internos não viram prop.
const INTERNAL_EVENTS = new Set(["phsa-radio", "phsa-tab-select"]);

let manifest: Manifest | undefined;
const loadManifest = () =>
  (manifest ??= JSON.parse(readFileSync(join(packageDir, "custom-elements.json"), "utf8")) as Manifest);

export function packageVersion(): string {
  return JSON.parse(readFileSync(join(packageDir, "package.json"), "utf8")).version;
}

function elementsOf(slug: string): Declaration[] {
  return loadManifest()
    .modules.filter((mod) => new RegExp(`^src/components/[^/]+/${slug}/`).test(mod.path))
    .flatMap((mod) => mod.declarations ?? [])
    .filter((d) => d.tagName);
}


function toApi(d: Declaration): ElementApi {
  const attributes = (d.attributes ?? []).filter((a) => a.name !== "class");
  const withAttribute = new Set(attributes.map((a) => a.fieldName));
  const members = (d.members ?? []).filter((m) => !m.privacy && !m.static);

  return {
    tag: d.tagName!,
    react: d.tagName === "phsa-icon" ? "Icon" : pascal(d.tagName!.replace(/^phsa-/, "")),
    description: d.description ?? "",
    attributes: attributes.map((a) => ({
      name: a.name,
      react: a.fieldName,
      type: a.type?.text,
      default: a.default,
      description: a.description,
    })),
    properties: members
      .filter((m) => m.kind === "field" && !m.attribute && !withAttribute.has(m.name))
      .map((m) => ({ name: m.name, type: m.type?.text, description: m.description })),
    events: (d.events ?? [])
      .filter((e) => e.name && !INTERNAL_EVENTS.has(e.name))
      .map((e) => ({ name: e.name, react: `on${pascal(e.name)}`, type: e.type?.text, description: e.description })),
    methods: members
      .filter((m) => m.kind === "method")
      .map((m) => ({
        name: `${m.name}(${(m.parameters ?? []).map((p) => p.name).join(", ")})`,
        description: m.description,
      })),
    slots: (d.slots ?? []).map((s) => ({ name: s.name || "(padrão)", description: s.description })),
    parts: (d.cssParts ?? []).map((p) => ({ name: p.name, description: p.description })),
  };
}

// Cabeçalho de cada exemplo:
//   /**
//    * @title Variantes
//    * @description Texto opcional.
//    */
//   "use client";
const HEADER = /^\/\*\*([\s\S]*?)\*\/\s*/;

function readExamples(slug: string): Example[] {
  const dir = join(examplesDir, slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith(".tsx"))
    .sort()
    .map((file) => {
      const source = readFileSync(join(dir, file), "utf8");
      const header = source.match(HEADER)?.[1] ?? "";
      const tag = (name: string) =>
        header.match(new RegExp(`@${name}\\s+([^\\n]*(?:\\n\\s*\\*\\s+(?!@)[^\\n]*)*)`))?.[1].replace(/\n\s*\*\s+/g, " ").trim() ?? "";
      const code = source
        .replace(HEADER, "")
        .replace(/^["']use client["'];?\s*/, "")
        .trim();
      return { key: `${slug}/${file.replace(/\.tsx$/, "")}`, title: tag("title") || file, description: tag("description"), code };
    });
}

function mainElement(slug: string, elements: ElementApi[]): ElementApi | undefined {
  return elements.find((e) => e.tag === `phsa-${slug}`) ?? elements.find((e) => e.tag === `phsa-${slug}er`) ?? elements[0];
}

export function getComponentPage(slug: string): ComponentPage | undefined {
  const entry = CATALOG.find((c) => c.slug === slug);
  if (!entry) return undefined;
  const elements = [slug, ...(entry.include ?? [])].flatMap(elementsOf).map(toApi);
  const main = mainElement(slug, elements);
  // O elemento principal vem primeiro na seção de API.
  const ordered = main ? [main, ...elements.filter((e) => e !== main)] : elements;
  return {
    ...entry,
    categoryLabel: CATEGORIES.find((c) => c.id === entry.category)!.label,
    description: main?.description || entry.summary,
    elements: ordered,
    examples: readExamples(slug),
  };
}

export type NavGroup = { id: string; label: string; items: { slug: string; name: string; summary: string }[] };

export function getNavigation(): NavGroup[] {
  return CATEGORIES.map((category) => ({
    ...category,
    items: CATALOG.filter((c) => c.category === category.id).map(({ slug, name, summary }) => ({ slug, name, summary })),
  }));
}
