export const themeIds = [
  "light",
  "morninglight",
  "sunshine",
  "dusk",
  "dark",
] as const

export type ThemeId = (typeof themeIds)[number]

export interface ThemeDefinition {
  id: ThemeId
  name: string
  nameZh: string
  description: string
  swatches: readonly [string, string, string]
}

export const themes: readonly ThemeDefinition[] = [
  {
    id: "light",
    name: "Spring",
    nameZh: "春色",
    description: "Warm white, fresh green, and quiet gold",
    swatches: ["oklch(0.982 0.007 100)", "oklch(0.58 0.13 160)", "oklch(0.68 0.12 82)"],
  },
  {
    id: "morninglight",
    name: "Morning Light",
    nameZh: "晨光",
    description: "Pure white, sky blue, and orange",
    swatches: ["oklch(0.996 0.002 240)", "oklch(0.6 0.13 238)", "oklch(0.7 0.16 55)"],
  },
  {
    id: "sunshine",
    name: "Sunshine",
    nameZh: "阳光",
    description: "White, vivid orange, and warm red",
    swatches: ["oklch(1 0 0)", "oklch(0.62 0.2 42)", "oklch(0.58 0.22 25)"],
  },
  {
    id: "dusk",
    name: "Dusk",
    nameZh: "暮色",
    description: "Ochre, deep blue, and burnished gold",
    swatches: ["oklch(0.88 0.055 82)", "oklch(0.3 0.07 255)", "oklch(0.68 0.14 78)"],
  },
  {
    id: "dark",
    name: "Night",
    nameZh: "夜色",
    description: "Blue black, electric green, and gold",
    swatches: ["oklch(0.175 0.022 258)", "oklch(0.74 0.16 162)", "oklch(0.84 0.13 88)"],
  },
] as const

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return themeIds.includes(value as ThemeId)
}

export function applyThemeClass(theme: ThemeId, root?: HTMLElement): void {
  const element = root ?? document.documentElement
  element.classList.remove(...themeIds)
  element.classList.add(theme)
  element.dataset.theme = theme
  element.style.colorScheme = theme === "dark" ? "dark" : "light"
}
