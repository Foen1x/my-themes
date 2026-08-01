<script setup lang="ts">
import { themes, type ThemeId } from '@my-themes/theme-contract'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ElementPreview from '@/components/ElementPreview.vue'
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const store = useThemeStore()
const tokens = ['background', 'foreground', 'card', 'primary', 'secondary', 'accent', 'success', 'warning', 'destructive', 'border']
const active = computed(() => themes.find((theme) => theme.id === store.current) ?? themes[0]!)

onMounted(() => {
  const requested = route.query.theme as ThemeId | undefined
  if (themes.some((theme) => theme.id === requested)) store.apply(requested!)
})
</script>

<template>
  <div>
    <header class="page-heading"><h1>Theme tokens</h1><p>十套主题延续 NexagentPortal 配色体系,并通过同一语义契约映射到 Element Plus。点击主题即可立即应用。</p></header>
    <div class="theme-selector">
      <button v-for="theme in themes" :key="theme.id" :class="[theme.id, { active: store.current === theme.id }]" type="button" @click="store.apply(theme.id)">
        <span><i v-for="color in theme.swatches" :key="color" :style="{ background: color }" /></span><strong>{{ theme.name }}</strong><small>{{ theme.nameZh }}</small>
      </button>
    </div>
    <div class="theme-summary"><div><span>Active theme</span><strong>{{ active.name }} / {{ active.nameZh }}</strong><p>{{ active.description }}</p></div><div class="mini-preview"><ElementPreview slug="button" compact /></div></div>
    <div class="section-heading"><h2>Semantic palette</h2><span>Computed in current theme</span></div>
    <div class="token-grid"><div v-for="token in tokens" :key="token"><span :style="{ background: `var(--${token})` }" /><strong>{{ token }}</strong><code>var(--{{ token }})</code></div></div>
  </div>
</template>

<style scoped>
.theme-selector { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }.theme-selector button { min-width: 0; padding: 13px; border: 1px solid var(--border); border-radius: 7px; background: var(--card); color: var(--card-foreground); text-align: left; }.theme-selector button.active { border-color: var(--primary); box-shadow: 0 0 0 2px color-mix(in oklch, var(--primary), transparent 82%); }.theme-selector span { display: flex; }.theme-selector i { width: 25px; height: 25px; border: 2px solid var(--card); border-radius: 50%; }.theme-selector i + i { margin-left: -6px; }.theme-selector strong, .theme-selector small { display: block; }.theme-selector strong { margin-top: 10px; font-size: 11px; overflow-wrap: anywhere; }.theme-selector small { color: var(--muted-foreground); font-size: 9px; }
.theme-summary { display: grid; grid-template-columns: .75fr 1.25fr; align-items: center; gap: 34px; margin-top: 28px; padding-block: 28px; border-block: 1px solid var(--border); }.theme-summary span { color: var(--primary); font-size: 10px; font-weight: 700; text-transform: uppercase; }.theme-summary strong { display: block; margin-top: 7px; font-size: 21px; }.theme-summary p { margin: 7px 0 0; color: var(--muted-foreground); font-size: 11px; }.mini-preview { padding-left: 30px; border-left: 1px solid var(--border); }
.token-grid { display: grid; grid-template-columns: repeat(5, 1fr); border-top: 1px solid var(--border); border-left: 1px solid var(--border); }.token-grid div { padding: 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--card); }.token-grid span { display: block; height: 78px; margin-bottom: 10px; border: 1px solid color-mix(in oklch, var(--foreground), transparent 90%); border-radius: 5px; }.token-grid strong, .token-grid code { display: block; }.token-grid strong { font-size: 10px; }.token-grid code { margin-top: 4px; color: var(--muted-foreground); font-size: 8px; overflow-wrap: anywhere; }
@media (max-width: 800px) { .theme-selector, .token-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 540px) { .theme-selector { grid-template-columns: 1fr 1fr; }.theme-summary { grid-template-columns: 1fr; }.mini-preview { padding: 20px 0 0; border-top: 1px solid var(--border); border-left: 0; }.token-grid { grid-template-columns: 1fr 1fr; } }
</style>
