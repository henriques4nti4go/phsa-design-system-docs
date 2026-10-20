import { getNavigation } from "@/docs/server";
import { DocsShell } from "@/site/docs-shell";

export default function ComponentsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DocsShell groups={getNavigation()}>{children}</DocsShell>;
}
