import { getNavigation } from "@/docs/server";
import { SiteShell } from "@/site/site-shell";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell groups={getNavigation()}>{children}</SiteShell>;
}
