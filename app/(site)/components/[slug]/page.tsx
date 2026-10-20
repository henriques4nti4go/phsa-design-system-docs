import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATALOG } from "@/docs/catalog";
import { getComponentPage } from "@/docs/server";
import { ComponentDoc } from "@/site/component-doc";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = CATALOG.find((c) => c.slug === slug);
  return entry ? { title: entry.name, description: entry.summary } : {};
}

export default async function ComponentPage({ params }: Params) {
  const { slug } = await params;
  const page = getComponentPage(slug);
  if (!page) notFound();

  const index = CATALOG.findIndex((c) => c.slug === slug);
  const sibling = (i: number) => (CATALOG[i] ? { slug: CATALOG[i].slug, name: CATALOG[i].name } : null);

  return <ComponentDoc page={page} prev={sibling(index - 1)} next={sibling(index + 1)} />;
}
