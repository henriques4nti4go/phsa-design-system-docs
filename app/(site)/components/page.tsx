import type { Metadata } from "next";
import { getNavigation, packageVersion } from "@/docs/server";
import { ComponentsOverview } from "@/site/components-overview";

export const metadata: Metadata = { title: "Componentes" };

export default function ComponentsPage() {
  return <ComponentsOverview groups={getNavigation()} version={packageVersion()} />;
}
