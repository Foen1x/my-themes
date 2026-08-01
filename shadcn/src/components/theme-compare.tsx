"use client"

import { themes, type ThemeId } from "@my-themes/theme-contract"
import { useState } from "react"
import { ComponentPreview } from "@/components/component-preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

export function ThemeCompare() {
  const [left, setLeft] = useState<ThemeId>("light")
  const [right, setRight] = useState<ThemeId>("dark")
  return <div><header className="page-heading"><h1>Theme comparison</h1><p>同一组组件、相同空间和状态，并排比较两套主题。每个预览区域独立继承主题变量。</p></header><div className="compare-controls"><label>Left<select value={left} onChange={(event) => setLeft(event.target.value as ThemeId)}>{themes.map((item) => <option key={item.id} value={item.id}>{item.name} / {item.nameZh}</option>)}</select></label><label>Right<select value={right} onChange={(event) => setRight(event.target.value as ThemeId)}>{themes.map((item) => <option key={item.id} value={item.id}>{item.name} / {item.nameZh}</option>)}</select></label></div><div className="compare-grid">{[{ id: left, label: "A" }, { id: right, label: "B" }].map((side) => <section key={side.label} className={side.id}><header><span>{side.label}</span><strong>{themes.find((item) => item.id === side.id)?.name}</strong></header><div className="compare-surface"><ComponentPreview slug="button" compact /><ComponentPreview slug="input" compact /><Alert><AlertTitle>Semantic feedback</AlertTitle><AlertDescription>Status colors remain legible.</AlertDescription></Alert><Progress value={68}><ProgressLabel>Coverage</ProgressLabel><ProgressValue /></Progress></div></section>)}</div></div>
}
