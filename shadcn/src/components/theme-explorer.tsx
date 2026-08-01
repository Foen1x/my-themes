"use client"

import { isThemeId, themes, type ThemeId } from "@my-themes/theme-contract"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useMemo } from "react"
import { ComponentPreview } from "@/components/component-preview"
import { useMounted } from "@/hooks/use-mounted"

const tokens = ["background", "foreground", "card", "primary", "secondary", "accent", "success", "warning", "destructive", "border"]

export function ThemeExplorer() {
  const router = useRouter()
  const params = useSearchParams()
  const { theme = "light", setTheme } = useTheme()
  const mounted = useMounted()
  const requestedTheme = params.get("theme")
  const selectedTheme = mounted && isThemeId(theme) ? theme : "light"
  const active = useMemo(() => themes.find((item) => item.id === selectedTheme) ?? themes[0]!, [selectedTheme])

  useEffect(() => {
    if (mounted && isThemeId(requestedTheme)) setTheme(requestedTheme)
  }, [mounted, requestedTheme, setTheme])

  const changeTheme = (nextTheme: ThemeId) => {
    setTheme(nextTheme)
    const nextParams = new URLSearchParams(params.toString())
    nextParams.set("theme", nextTheme)
    router.replace(`/themes?${nextParams.toString()}`, { scroll: false })
  }

  return <div><header className="page-heading"><h1>Theme tokens</h1><p>五套主题来自 NexagentPortal 配色，并通过同一语义契约映射到 Tailwind 与 shadcn 组件。点击主题即可立即应用。</p></header><div className="theme-selector">{themes.map((item) => <button key={item.id} className={`${item.id}${selectedTheme === item.id ? " active" : ""}`} type="button" onClick={() => changeTheme(item.id)}><span>{item.swatches.map((color) => <i key={color} style={{ background: color }} />)}</span><strong>{item.name}</strong><small>{item.nameZh}</small></button>)}</div><div className="theme-summary"><div><span>Active theme</span><strong>{active.name} / {active.nameZh}</strong><p>{active.description}</p></div><div className="mini-preview"><ComponentPreview slug="button" compact /></div></div><div className="section-heading"><h2>Semantic palette</h2><span>Computed in current theme</span></div><div className="token-grid">{tokens.map((token) => <div key={token}><span style={{ background: `var(--${token})` }} /><strong>{token}</strong><code>var(--{token})</code></div>)}</div></div>
}
