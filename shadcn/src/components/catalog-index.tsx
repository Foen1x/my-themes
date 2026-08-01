"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { catalog, categories } from "@/catalog"

export function CatalogIndex() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const requestedCategory = searchParams.get("category")
  const [category, setCategory] = useState(requestedCategory && categories.includes(requestedCategory as never) ? requestedCategory : "All")
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return catalog.filter((entry) => (category === "All" || entry.category === category) && (!term || `${entry.name} ${entry.nameZh} ${entry.description}`.toLowerCase().includes(term)))
  }, [category, query])

  return <div><header className="page-heading"><h1>Components</h1><p>当前 shadcn 官方组件目录的完整索引。进入独立路由，检查真实 Base UI 交互、状态和主题映射。</p></header><div className="catalog-filters"><label><Search /><input value={query} placeholder="Filter by name..." onChange={(event) => setQuery(event.target.value)} /></label><div className="category-tabs" role="tablist" aria-label="组件分类">{["All", ...categories].map((item) => <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="catalog-count">Showing {visible.length} of {catalog.length}</div><div className="component-index">{visible.map((entry) => <Link key={entry.slug} href={`/components/${entry.slug}`}><span className="component-glyph">{entry.name.slice(0, 2)}</span><span><strong>{entry.name}</strong><small>{entry.nameZh}</small></span><em>{entry.category}</em></Link>)}</div></div>
}
