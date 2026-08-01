import { CatalogIndex } from "@/components/catalog-index"
import { Suspense } from "react"

export default function ComponentsPage() {
  return <Suspense fallback={<div className="preview-frame">Loading catalog…</div>}><CatalogIndex /></Suspense>
}
