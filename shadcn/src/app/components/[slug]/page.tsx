import { notFound } from "next/navigation"
import { catalog, catalogBySlug } from "@/catalog"
import { ComponentDetail } from "@/components/component-detail"

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }))
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = catalogBySlug.get(slug)
  if (!entry) notFound()
  return <ComponentDetail entry={entry} />
}
