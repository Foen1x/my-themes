import { applyThemeClass, isDarkTheme, isThemeId, type ThemeId } from '@my-themes/theme-contract'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const STORAGE_KEY = 'my-themes:theme'

function getInitialTheme(): ThemeId {
  if (typeof window === 'undefined') return 'light'
  const queryTheme = new URLSearchParams(window.location.search).get('theme')
  if (isThemeId(queryTheme)) return queryTheme
  const storedTheme = window.localStorage.getItem(STORAGE_KEY)
  return isThemeId(storedTheme) ? storedTheme : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const current = ref<ThemeId>(getInitialTheme())
  const isDark = computed(() => isDarkTheme(current.value))

  function apply(theme: ThemeId) {
    current.value = theme
    applyThemeClass(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }

  function initialize() {
    applyThemeClass(current.value)
  }

  return { current, isDark, apply, initialize }
})
