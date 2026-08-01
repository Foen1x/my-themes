<script setup lang="ts">
import { themes } from '@my-themes/theme-contract'
import { Brush, Close, Collection, Menu, Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { catalogByCategory, vueCatalog, vueCategories } from '@/catalog'
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const query = ref('')
const mobileNavigationOpen = ref(false)

const matches = computed(() => {
  const term = query.value.trim().toLowerCase()
  if (!term) return []
  return vueCatalog.filter((entry) =>
    `${entry.name} ${entry.nameZh} ${entry.category}`.toLowerCase().includes(term),
  ).slice(0, 8)
})

function openComponent(slug: string) {
  query.value = ''
  mobileNavigationOpen.value = false
  router.push(`/components/${slug}`)
}

onMounted(themeStore.initialize)
</script>

<template>
  <div class="catalog-shell">
    <aside class="catalog-sidebar" :class="{ 'is-open': mobileNavigationOpen }">
      <div class="brand-row">
        <span class="brand-mark"><Collection /></span>
        <div>
          <strong>Theme Lab</strong>
          <span>Vue + Element Plus</span>
        </div>
        <button class="mobile-close" type="button" aria-label="关闭导航" @click="mobileNavigationOpen = false">
          <Close />
        </button>
      </div>

      <nav class="primary-nav" aria-label="主导航">
        <RouterLink to="/">Overview</RouterLink>
        <RouterLink to="/components">Components <span>{{ vueCatalog.length }}</span></RouterLink>
        <RouterLink to="/themes">Themes <span>{{ themes.length }}</span></RouterLink>
        <RouterLink to="/compare">Compare</RouterLink>
        <RouterLink to="/patterns">Patterns</RouterLink>
      </nav>

      <div class="component-navigation">
        <section v-for="category in vueCategories" :key="category">
          <h2>{{ category }}</h2>
          <RouterLink
            v-for="entry in catalogByCategory(category)"
            :key="entry.slug"
            :to="`/components/${entry.slug}`"
            @click="mobileNavigationOpen = false"
          >
            {{ entry.name }}
          </RouterLink>
        </section>
      </div>
    </aside>

    <div v-if="mobileNavigationOpen" class="navigation-scrim" @click="mobileNavigationOpen = false" />

    <div class="catalog-workspace">
      <header class="catalog-header">
        <button class="mobile-menu" type="button" aria-label="打开导航" @click="mobileNavigationOpen = true">
          <Menu />
        </button>
        <div class="search-box">
          <Search />
          <input v-model="query" aria-label="搜索组件" placeholder="Search 82 components..." />
          <div v-if="matches.length" class="search-results">
            <button v-for="entry in matches" :key="entry.slug" type="button" @click="openComponent(entry.slug)">
              <span>{{ entry.name }}</span>
              <small>{{ entry.nameZh }} · {{ entry.category }}</small>
            </button>
          </div>
        </div>
        <label class="theme-control" title="选择主题">
          <Brush />
          <select
            :value="themeStore.current"
            class="theme-select"
            aria-label="选择主题"
            @change="themeStore.apply(($event.target as HTMLSelectElement).value as typeof themeStore.current)"
          >
            <option v-for="theme in themes" :key="theme.id" :value="theme.id">
              {{ theme.nameZh }} · {{ theme.name }}
            </option>
          </select>
        </label>
        <a class="framework-link" href="http://localhost:3202" title="打开 shadcn 展厅">React</a>
      </header>

      <main class="catalog-main" :data-route="route.name">
        <RouterView />
      </main>
    </div>
  </div>
</template>
