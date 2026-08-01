import { themes } from "@my-themes/theme-contract"
import { ArrowRight, Check, CircleCheck, Grid3X3, WandSparkles } from "lucide-react"
import Link from "next/link"
import { catalog, categories, entriesFor } from "@/catalog"
import { ComponentPreview } from "@/components/component-preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

export default function HomePage() {
  return (
    <div>
      <header className="page-heading dashboard-heading">
        <div><span className="eyebrow">SHADCN COMPONENT CATALOG</span><h1>React component theme lab</h1><p>在真实控件、状态和产品组合中检查共享语义主题。当前官方目录的所有 shadcn 项目均有稳定路由和交互预览。</p></div>
        <div className="coverage-lockup"><strong>{catalog.length}/63</strong><span><CircleCheck /> previews covered</span></div>
      </header>

      <section className="dashboard-strip" aria-label="Catalog status"><div><Grid3X3 /><span>7 categories</span></div><div><WandSparkles /><span>{themes.length} semantic themes</span></div><div><Check /><span>Owned component source</span></div><Link href="/components">Browse all <ArrowRight /></Link></section>

      <div className="section-heading"><h2>Live controls</h2><span>Current theme</span></div>
      <div className="preview-frame dashboard-preview"><ComponentPreview slug="button" compact /><div className="preview-divider" /><div className="grid gap-3"><label className="text-xs font-medium">Component search</label><Input placeholder="Search catalog" /><label className="text-xs font-medium">Release channel</label><Input value="Stable" readOnly /></div><div className="grid gap-5"><Alert><Check /><AlertTitle>All tokens resolved</AlertTitle><AlertDescription>Ten palettes are ready.</AlertDescription></Alert><Progress value={82}><ProgressLabel>Coverage</ProgressLabel><ProgressValue /></Progress></div></div>

      <div className="section-heading"><h2>Theme signatures</h2><Link href="/themes">Inspect tokens</Link></div>
      <div className="theme-signatures">{themes.map((theme) => <Link key={theme.id} href={`/themes?theme=${theme.id}`} className={theme.id}><span className="theme-dots">{theme.swatches.map((color) => <i key={color} style={{ background: color }} />)}</span><strong>{theme.name}</strong><small>{theme.nameZh}</small></Link>)}</div>

      <div className="section-heading"><h2>Component inventory</h2><span>Complete official index</span></div>
      <div className="inventory-list">{categories.map((category) => <section key={category}><div><strong>{category}</strong><span>{entriesFor(category).length}</span></div><p>{entriesFor(category).slice(0, 5).map((entry) => entry.name).join(" · ")}{entriesFor(category).length > 5 ? " · …" : ""}</p><Link href={`/components?category=${encodeURIComponent(category)}`} aria-label={`查看 ${category}`}><ArrowRight /></Link></section>)}</div>
    </div>
  )
}
