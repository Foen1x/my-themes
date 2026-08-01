<script setup lang="ts">
import { ArrowLeft, Close, FullScreen, Link } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ElementPreview from '@/components/ElementPreview.vue'
import { vueCatalogBySlug } from '@/catalog'

const route = useRoute()
const focusMode = ref(false)
const entry = computed(() => vueCatalogBySlug.get(String(route.params.slug)))
</script>

<template>
  <div v-if="entry" class="component-page" :class="{ 'focus-mode': focusMode }">
    <header class="component-heading">
      <div>
        <RouterLink to="/components" class="back-link"><ArrowLeft /> All components</RouterLink>
        <span>{{ entry.category }} · {{ entry.nameZh }}</span>
        <h1>{{ entry.name }}</h1>
        <p>{{ entry.description }}</p>
      </div>
      <div class="component-actions">
        <button type="button" @click="focusMode = !focusMode"><component :is="focusMode ? Close : FullScreen" />{{ focusMode ? 'Exit focus' : 'Focus' }}</button>
        <a :href="entry.docsUrl" target="_blank" rel="noreferrer">Docs <Link /></a>
      </div>
    </header>

    <div class="section-heading"><h2>Interactive preview</h2><span>Theme-sensitive surface</span></div>
    <div class="preview-frame component-preview"><ElementPreview :slug="entry.slug" /></div>

    <div class="component-notes">
      <section><h2>States to inspect</h2><p>默认、悬停、键盘焦点、禁用和反馈状态均继承当前语义主题；切换顶部主题不会重建组件。</p></section>
      <section><h2>Theme mapping</h2><p>Element Plus 的 <code>--el-color-primary</code>、表面、边框、文字与状态变量由共享 OKLCH 契约映射。</p></section>
    </div>
  </div>
  <el-result v-else icon="warning" title="Component not found" sub-title="The requested slug is not in the 82-item catalog."><template #extra><RouterLink to="/components"><el-button type="primary">Back to catalog</el-button></RouterLink></template></el-result>
</template>

<style scoped>
.component-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; }.component-heading span { display: block; margin-bottom: 8px; color: var(--primary); font-size: 10px; font-weight: 700; text-transform: uppercase; }.component-heading h1 { margin: 0; font-size: 36px; letter-spacing: 0; }.component-heading p { margin: 9px 0 0; color: var(--muted-foreground); font-size: 13px; }.back-link { display: inline-flex !important; align-items: center; gap: 5px; margin-bottom: 25px !important; color: var(--muted-foreground) !important; font-weight: 500 !important; text-decoration: none; text-transform: none !important; }.back-link svg { width: 14px; }
.component-actions { display: flex; gap: 7px; }.component-actions button, .component-actions a { display: flex; height: 34px; align-items: center; gap: 7px; padding: 0 10px; border: 1px solid var(--border); border-radius: 6px; background: var(--card); color: var(--foreground); font-size: 11px; text-decoration: none; }.component-actions svg { width: 14px; }.component-preview { display: grid; place-items: stretch; overflow: visible; }
.component-notes { display: grid; grid-template-columns: 1fr 1fr; gap: 38px; margin-top: 34px; padding-top: 25px; border-top: 1px solid var(--border); }.component-notes h2 { margin: 0 0 8px; font-size: 13px; }.component-notes p { margin: 0; color: var(--muted-foreground); font-size: 11px; line-height: 1.7; }.component-notes code { color: var(--primary); }
.focus-mode { position: fixed; inset: 0; z-index: 100; overflow: auto; padding: 34px max(24px, calc((100vw - 1120px) / 2)); background: var(--background); }.focus-mode .back-link, .focus-mode .component-notes { display: none !important; }
@media (max-width: 620px) { .component-heading { align-items: flex-start; flex-direction: column; }.component-heading h1 { font-size: 30px; }.component-notes { grid-template-columns: 1fr; gap: 22px; } }
</style>
