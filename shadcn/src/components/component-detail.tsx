"use client"

import { ArrowLeft, ExternalLink, Focus, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { CatalogEntry } from "@/catalog"
import { ComponentPreview } from "@/components/component-preview"

export function ComponentDetail({ entry }: { entry: CatalogEntry }) {
  const [focus, setFocus] = useState(false)
  return <div className={`component-page${focus ? " focus-mode" : ""}`}><header className="component-heading"><div><Link href="/components" className="back-link"><ArrowLeft /> All components</Link><span>{entry.category} · {entry.nameZh}</span><h1>{entry.name}</h1><p>{entry.description}</p></div><div className="component-actions"><button type="button" onClick={() => setFocus(!focus)}>{focus ? <X /> : <Focus />}{focus ? "Exit focus" : "Focus"}</button><a href={entry.docsUrl} target="_blank" rel="noreferrer">Docs <ExternalLink /></a></div></header><div className="section-heading"><h2>Interactive preview</h2><span>Theme-sensitive surface</span></div><div className="preview-frame component-preview-frame"><ComponentPreview key={entry.slug} slug={entry.slug} /></div><div className="component-notes"><section><h2>States to inspect</h2><p>默认、悬停、键盘焦点、禁用和反馈状态均继承当前语义主题；切换顶部主题不会重建页面结构。</p></section><section><h2>Owned source</h2><p>组件源码保存在项目内，颜色、表面、边框与状态全部映射到共享 OKLCH 语义契约。</p></section></div></div>
}
