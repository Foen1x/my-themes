<script setup lang="ts">
import { ArrowRight, Top } from '@element-plus/icons-vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { catalogByCategory, vueCatalog, vueCategories } from '@/catalog'
import ElementPreview from '@/components/ElementPreview.vue'

const activeCategory = ref<string>('Basic')

function syncActiveCategory() {
  let current: string = vueCategories[0] ?? 'Basic'
  for (const category of vueCategories) {
    const section = document.getElementById(`example-${category}`)
    if (section && section.getBoundingClientRect().top <= 140) current = category
  }
  activeCategory.value = current
}

function scrollToCategory(category: string) {
  activeCategory.value = category
  document.getElementById(`example-${category}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  syncActiveCategory()
  window.addEventListener('scroll', syncActiveCategory, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', syncActiveCategory))
</script>

<template>
  <div class="example-page">
    <header class="page-heading">
      <h1>Example gallery</h1>
      <p>全部 {{ vueCatalog.length }} 个 Element Plus 组件的真实交互示例,按官方分类连续排布。切换顶部主题,整页即刻换肤。</p>
    </header>

    <nav class="example-nav" aria-label="示例分类">
      <button
        v-for="category in vueCategories"
        :key="category"
        type="button"
        :class="{ active: activeCategory === category }"
        @click="scrollToCategory(category)"
      >
        {{ category }}<span>{{ catalogByCategory(category).length }}</span>
      </button>
      <button type="button" class="example-top" aria-label="回到顶部" @click="backToTop"><Top /></button>
    </nav>

    <section v-for="category in vueCategories" :id="`example-${category}`" :key="category" class="example-category">
      <div class="section-heading">
        <h2>{{ category }}</h2>
        <span>{{ catalogByCategory(category).length }} components</span>
      </div>
      <div class="example-grid">
        <article v-for="entry in catalogByCategory(category)" :key="entry.slug" class="example-block">
          <header>
            <span><strong>{{ entry.name }}</strong><small>{{ entry.nameZh }}</small></span>
            <RouterLink :to="`/components/${entry.slug}`">打开 <ArrowRight /></RouterLink>
          </header>
          <div class="example-surface"><ElementPreview :slug="entry.slug" compact /></div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.example-page { padding-bottom: 40px; }
.example-nav { position: sticky; top: 58px; z-index: 8; display: flex; align-items: center; gap: 5px; margin: 0 -4px; padding: 10px 4px; overflow-x: auto; background: var(--background); scrollbar-width: none; }
.example-nav button { display: flex; min-height: 30px; align-items: center; gap: 6px; padding: 0 11px; border: 1px solid transparent; border-radius: 999px; background: transparent; color: var(--muted-foreground); font-size: 11px; white-space: nowrap; }
.example-nav button:hover { background: var(--muted); }
.example-nav button.active { border-color: var(--border); background: var(--card); color: var(--foreground); box-shadow: var(--shadow-soft); }
.example-nav button span { color: var(--muted-foreground); font-size: 9px; }
.example-nav button.active span { color: var(--primary); }
.example-nav .example-top { margin-left: auto; width: 30px; justify-content: center; padding: 0; border-color: var(--border); background: var(--card); }
.example-nav .example-top svg { width: 13px; }
.example-category { scroll-margin-top: 112px; }
.example-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.example-block { min-width: 0; overflow: hidden; border: 1px solid var(--border); border-radius: 10px; background: var(--card); box-shadow: var(--shadow-soft); content-visibility: auto; contain-intrinsic-size: 260px; transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease; }
.example-block:hover { border-color: color-mix(in oklch, var(--primary), transparent 62%); box-shadow: var(--shadow-lift); transform: translateY(-2px); }
.example-block > header { display: flex; min-height: 46px; align-items: center; justify-content: space-between; gap: 10px; padding: 0 14px; border-bottom: 1px solid var(--border); }
.example-block > header strong, .example-block > header small { display: block; }
.example-block > header strong { font-size: 12px; }
.example-block > header small { margin-top: 2px; color: var(--muted-foreground); font-size: 9px; }
.example-block > header a { display: inline-flex; align-items: center; gap: 4px; color: var(--primary); font-size: 10px; font-weight: 650; text-decoration: none; }
.example-block > header a svg { width: 12px; }
.example-surface { padding: 16px 14px; }
.example-surface :deep(.element-preview) { min-height: 120px; }
@media (max-width: 1100px) { .example-grid { grid-template-columns: 1fr; } }
@media (max-width: 620px) { .example-category { scroll-margin-top: 100px; } }
</style>
