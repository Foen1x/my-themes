import { ThemeExplorer } from "@/components/theme-explorer"
import { Suspense } from "react"

export default function ThemesPage() {
  return <Suspense fallback={<div className="preview-frame">Loading themes…</div>}><ThemeExplorer /></Suspense>
}
