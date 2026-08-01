export const themeIds = [
  "light",
  "morninglight",
  "sunshine",
  "dusk",
  "dark",
  "breeze",
  "sakura",
  "aurora",
  "forest",
  "ember",
] as const

export type ThemeId = (typeof themeIds)[number]

export interface ThemeDefinition {
  id: ThemeId
  name: string
  nameZh: string
  scheme: "light" | "dark"
  description: string
  swatches: readonly [string, string, string]
}

export const themes: readonly ThemeDefinition[] = [
  {
    id: "light",
    name: "Spring",
    nameZh: "春色",
    scheme: "light",
    description: "Warm white, fresh green, and quiet gold",
    swatches: ["oklch(0.982 0.007 100)", "oklch(0.58 0.13 160)", "oklch(0.68 0.12 82)"],
  },
  {
    id: "morninglight",
    name: "Morning Light",
    nameZh: "晨光",
    scheme: "light",
    description: "Pure white, sky blue, and orange",
    swatches: ["oklch(0.996 0.002 240)", "oklch(0.6 0.13 238)", "oklch(0.7 0.16 55)"],
  },
  {
    id: "sunshine",
    name: "Sunshine",
    nameZh: "阳光",
    scheme: "light",
    description: "White, vivid orange, and warm red",
    swatches: ["oklch(1 0 0)", "oklch(0.62 0.2 42)", "oklch(0.58 0.22 25)"],
  },
  {
    id: "dusk",
    name: "Dusk",
    nameZh: "暮色",
    scheme: "light",
    description: "Ochre, deep blue, and burnished gold",
    swatches: ["oklch(0.88 0.055 82)", "oklch(0.3 0.07 255)", "oklch(0.68 0.14 78)"],
  },
  {
    id: "dark",
    name: "Night",
    nameZh: "夜色",
    scheme: "dark",
    description: "Blue black, electric green, and gold",
    swatches: ["oklch(0.175 0.022 258)", "oklch(0.74 0.16 162)", "oklch(0.84 0.13 88)"],
  },
  {
    id: "breeze",
    name: "Glacier Breeze",
    nameZh: "清风",
    scheme: "light",
    description: "Glacier white, clear teal, and quiet gold",
    swatches: ["oklch(0.985 0.008 200)", "oklch(0.62 0.11 200)", "oklch(0.7 0.12 85)"],
  },
  {
    id: "sakura",
    name: "Sakura",
    nameZh: "樱语",
    scheme: "light",
    description: "Petal white, rose pink, and wisteria violet",
    swatches: ["oklch(0.978 0.01 8)", "oklch(0.58 0.16 355)", "oklch(0.62 0.12 310)"],
  },
  {
    id: "aurora",
    name: "Aurora",
    nameZh: "极光",
    scheme: "dark",
    description: "Deep indigo, aurora violet, and polar cyan",
    swatches: ["oklch(0.17 0.026 285)", "oklch(0.72 0.17 305)", "oklch(0.8 0.12 195)"],
  },
  {
    id: "forest",
    name: "Deep Forest",
    nameZh: "幽林",
    scheme: "dark",
    description: "Pine black, emerald green, and moss gold",
    swatches: ["oklch(0.168 0.02 168)", "oklch(0.74 0.16 148)", "oklch(0.82 0.12 92)"],
  },
  {
    id: "ember",
    name: "Ember",
    nameZh: "余烬",
    scheme: "dark",
    description: "Warm charcoal, burnished amber, and copper",
    swatches: ["oklch(0.178 0.014 55)", "oklch(0.74 0.15 62)", "oklch(0.8 0.13 85)"],
  },
] as const

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return themeIds.includes(value as ThemeId)
}

export function isDarkTheme(theme: ThemeId): boolean {
  return themes.find((item) => item.id === theme)?.scheme === "dark"
}

export function applyThemeClass(theme: ThemeId, root?: HTMLElement): void {
  const element = root ?? document.documentElement
  element.classList.remove(...themeIds)
  element.classList.add(theme)
  element.dataset.theme = theme
  element.style.colorScheme = isDarkTheme(theme) ? "dark" : "light"
}
