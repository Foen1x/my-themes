"use client"

import { isThemeId, themes } from "@my-themes/theme-contract"
import { Boxes, Menu, Palette, Search, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { type ReactNode, useMemo, useState } from "react"
import { catalog, categories, entriesFor } from "@/catalog"
import { useMounted } from "@/hooks/use-mounted"

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  const [query, setQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return catalog.filter((entry) => `${entry.name} ${entry.nameZh} ${entry.category}`.toLowerCase().includes(term)).slice(0, 8)
  }, [query])

  const openComponent = (slug: string) => {
    setQuery("")
    setMobileOpen(false)
    router.push(`/components/${slug}`)
  }

  const changeTheme = (nextTheme: string) => {
    if (!isThemeId(nextTheme)) return

    setTheme(nextTheme)

    if (pathname === "/themes") {
      const params = new URLSearchParams(window.location.search)
      params.set("theme", nextTheme)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

  const navigation = [
    ["Overview", "/", ""],
    ["Components", "/components", String(catalog.length)],
    ["Themes", "/themes", String(themes.length)],
    ["Compare", "/compare", ""],
    ["Patterns", "/patterns", ""],
    ["Example", "/example", String(catalog.length)],
    ["AI Workspace", "/workspace", "AI"],
  ] as const

  return (
    <div className="app-shell">
      <aside className="app-sidebar" data-open={mobileOpen}>
        <div className="brand-row">
          <span className="brand-mark"><Boxes aria-hidden="true" /></span>
          <div className="brand-copy"><strong>Theme Lab</strong><span>Next.js + shadcn</span></div>
          <button className="mobile-close" type="button" aria-label="关闭导航" onClick={() => setMobileOpen(false)}><X /></button>
        </div>
        <nav className="primary-nav" aria-label="主导航">
          {navigation.map(([label, href, count]) => <Link key={href} href={href} data-active={pathname === href}>{label}{count && <span>{count}</span>}</Link>)}
        </nav>
        <div className="component-nav">
          {categories.map((category) => <section key={category}><h2>{category}</h2>{entriesFor(category).map((entry) => <Link key={entry.slug} href={`/components/${entry.slug}`} data-active={pathname === `/components/${entry.slug}`} onClick={() => setMobileOpen(false)}>{entry.name}</Link>)}</section>)}
        </div>
      </aside>

      {mobileOpen && <button className="navigation-scrim" type="button" aria-label="关闭导航" onClick={() => setMobileOpen(false)} />}

      <div className="workspace">
        <header className="app-header">
          <button className="mobile-menu" type="button" aria-label="打开导航" onClick={() => setMobileOpen(true)}><Menu /></button>
          <div className="search-box">
            <Search aria-hidden="true" />
            <input value={query} aria-label="搜索组件" placeholder="Search 63 components..." onChange={(event) => setQuery(event.target.value)} />
            {matches.length > 0 && <div className="search-results">{matches.map((entry) => <a key={entry.slug} href={`/components/${entry.slug}`} onClick={(event) => { event.preventDefault(); openComponent(entry.slug) }}><span>{entry.name}</span><small>{entry.nameZh} · {entry.category}</small></a>)}</div>}
          </div>
          <label className="theme-control" title="选择主题"><Palette aria-hidden="true" /><select className="theme-select" value={mounted && isThemeId(theme) ? theme : "light"} aria-label="选择主题" disabled={!mounted} onChange={(event) => changeTheme(event.target.value)}>{themes.map((item) => <option key={item.id} value={item.id}>{item.nameZh} · {item.name}</option>)}</select></label>
          <a className="framework-link" href="http://localhost:3201" title="打开 Vue 展厅">Vue</a>
        </header>
        <main className="app-main">{children}</main>
      </div>
    </div>
  )
}
