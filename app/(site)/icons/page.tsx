import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { Suspense } from "react";
import { IconBrowser } from "@/site/icon-browser";

export const metadata: Metadata = { title: "Ícones" };

// Só a versão: os ícones em si vêm de public/icons.json, carregado no cliente.
const lucideVersion = (): string =>
  JSON.parse(readFileSync(join(process.cwd(), "docs/icon-meta.json"), "utf8")).version;

export default function IconsPage() {
  return (
    // `useSearchParams` precisa de Suspense para a página continuar estática.
    <Suspense>
      <IconBrowser version={lucideVersion()} />
    </Suspense>
  );
}
