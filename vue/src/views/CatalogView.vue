<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { vueCatalog, vueCategories } from '@/catalog'

const route = useRoute()
const query = ref('')
const activeCategory = ref<string>((route.query.category as string) || 'All')
const visibleEntries = computed(() => {
  const term = query.value.trim().toLowerCase()
  return vueCatalog.filter((entry) => {
    const categoryMatch = activeCategory.value === 'All' || entry.category === activeCategory.value
    const queryMatch = !term || `${entry.name} ${entry.nameZh} ${entry.description}`.toLowerCase().includes(term)
    return categoryMatch && queryMatch
  })
})
</script>

<template>
  <div>
    <header class="page-heading"><h1>Components</h1><p>Element Plus 官方组件的完整索引。选择组件进入独立路由，检查交互、状态和主题映射。</p></header>
    <div class="catalog-filters">
      <label><Search /><input v-model="query" placeholder="Filter by name..." /></label>
      <div class="category-tabs" role="tablist" aria-label="组件分类">
        <button v-for="category in ['All', ...vueCategories]" :key="category" type="button" :class="{ active: activeCategory === category }" @click="activeCategory = category">{{ category }}</button>
      </div>
    </div>
    <div class="catalog-count">Showing {{ visibleEntries.length }} of {{ vueCatalog.length }}</div>
    <div class="component-index">
      <RouterLink v-for="entry in visibleEntries" :key="entry.slug" :to="`/components/${entry.slug}`">
        <span class="component-glyph">{{ entry.name.slice(0, 2) }}</span>
        <span><strong>{{ entry.name }}</strong><small>{{ entry.nameZh }}</small></span>
        <em>{{ entry.category }}</em>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.catalog-filters { position: sticky; top: 58px; z-index: 8; padding: 12px 0; background: var(--background); }.catalog-filters label { display: flex; width: min(430px, 100%); height: 36px; align-items: center; gap: 8px; padding: 0 10px; border: 1px solid var(--border); border-radius: 7px; background: var(--card); }.catalog-filters svg { width: 15px; color: var(--muted-foreground); }.catalog-filters input { min-width: 0; flex: 1; border: 0; outline: 0; background: transparent; color: var(--foreground); }
.category-tabs { display: flex; gap: 5px; margin-top: 12px; overflow-x: auto; scrollbar-width: none; }.category-tabs button { min-height: 29px; padding: 0 10px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: var(--muted-foreground); font-size: 11px; white-space: nowrap; }.category-tabs button:hover { background: var(--muted); }.category-tabs button.active { border-color: var(--border); background: var(--card); color: var(--foreground); box-shadow: var(--shadow-soft); }.catalog-count { margin: 10px 0; color: var(--muted-foreground); font-size: 10px; }
.component-index { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--border); border-left: 1px solid var(--border); }.component-index a { display: grid; min-height: 80px; grid-template-columns: 36px 1fr; align-items: center; gap: 11px; padding: 13px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--card); text-decoration: none; content-visibility: auto; contain-intrinsic-size: 80px; }.component-index a:hover { background: var(--accent); }.component-glyph { display: grid; width: 36px; height: 36px; place-items: center; border: 1px solid var(--border); border-radius: 6px; color: var(--primary); font-size: 10px; font-weight: 700; text-transform: uppercase; }.component-index strong, .component-index small { display: block; }.component-index strong { overflow-wrap: anywhere; font-size: 12px; }.component-index small { margin-top: 3px; color: var(--muted-foreground); font-size: 10px; }.component-index em { grid-column: 2; margin-top: -8px; color: var(--muted-foreground); font-size: 9px; font-style: normal; }
@media (max-width: 900px) { .component-index { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .component-index { grid-template-columns: 1fr; } }
</style>
