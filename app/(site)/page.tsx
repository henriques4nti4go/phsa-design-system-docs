import { CATALOG } from "@/docs/catalog";
import { packageVersion } from "@/docs/server";
import { Landing } from "@/site/landing";

export default function Home() {
  return <Landing version={packageVersion()} componentCount={CATALOG.length} />;
}
