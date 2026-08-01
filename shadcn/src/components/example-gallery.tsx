"use client"

import { ArrowRight, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { catalog, categories, entriesFor } from "@/catalog"
import { ComponentPreview } from "@/components/component-preview"

export function ExampleGallery() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0])

  useEffect(() => {
    const syncActiveCategory = () => {
      let current: string = categories[0]
      for (const category of categories) {
        const section = document.getElementById(`example-${category}`)
        if (section && section.getBoundingClientRect().top <= 140) current = category
      }
      setActiveCategory(current)
    }
    syncActiveCategory()
    window.addEventListener("scroll", syncActiveCategory, { passive: true })
    return () => window.removeEventListener("scroll", syncActiveCategory)
  }, [])

  const scrollToCategory = (category: string) => {
    setActiveCategory(category)
    document.getElementById(`example-${category}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="example-page">
      <header className="page-heading">
        <h1>Example gallery</h1>
        <p>全部 {catalog.length} 个 shadcn 组件的真实交互示例,按官方分类连续排布。切换顶部主题,整页即刻换肤。</p>
      </header>

      <nav className="example-nav" aria-label="示例分类">
        {categories.map((category) => (
          <button key={category} className={activeCategory === category ? "active" : ""} type="button" onClick={() => scrollToCategory(category)}>
            {category}<span>{entriesFor(category).length}</span>
          </button>
        ))}
        <button className="example-top" type="button" aria-label="回到顶部" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></button>
      </nav>

      {categories.map((category) => (
        <section key={category} id={`example-${category}`} className="example-category">
          <div className="section-heading">
            <h2>{category}</h2>
            <span>{entriesFor(category).length} components</span>
          </div>
          <div className="example-grid">
            {entriesFor(category).map((entry) => (
              <article key={entry.slug} className="example-block">
                <header>
                  <span><strong>{entry.name}</strong><small>{entry.nameZh}</small></span>
                  <Link href={`/components/${entry.slug}`}>打开 <ArrowRight /></Link>
                </header>
                <div className="example-surface"><ComponentPreview slug={entry.slug} compact /></div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
