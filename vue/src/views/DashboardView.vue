<script setup lang="ts">
import { themes } from '@my-themes/theme-contract'
import { ArrowRight, Check, CircleCheck, Grid, MagicStick } from '@element-plus/icons-vue'
import ElementPreview from '@/components/ElementPreview.vue'
import { catalogByCategory, vueCatalog, vueCategories } from '@/catalog'
</script>

<template>
  <div>
    <header class="page-heading dashboard-heading">
      <div>
        <span class="eyebrow">ELEMENT PLUS CATALOG</span>
        <h1>Vue component theme lab</h1>
        <p>在真实控件、状态和产品组合中检查共享语义主题。所有 Element Plus 官方目录项都有稳定路由与交互预览。</p>
      </div>
      <div class="coverage-lockup"><strong>{{ vueCatalog.length }}/82</strong><span><CircleCheck /> previews covered</span></div>
    </header>

    <section class="dashboard-strip" aria-label="Catalog status">
      <div><Grid /><span>7 categories</span></div>
      <div><MagicStick /><span>{{ themes.length }} semantic themes</span></div>
      <div><Check /><span>Shared token contract</span></div>
      <RouterLink to="/components">Browse all <ArrowRight /></RouterLink>
    </section>

    <div class="section-heading"><h2>Live controls</h2><span>Current theme</span></div>
    <div class="preview-frame dashboard-preview">
      <ElementPreview slug="button" compact />
      <div class="preview-divider" />
      <el-form label-position="top" class="quick-form">
        <el-form-item label="Component search"><el-input placeholder="Search catalog" /></el-form-item>
        <el-form-item label="Release channel"><el-select model-value="stable"><el-option label="Stable" value="stable" /><el-option label="Preview" value="preview" /></el-select></el-form-item>
      </el-form>
      <div class="status-sample"><el-alert title="All tokens resolved" type="success" show-icon /><el-progress :percentage="82" :stroke-width="8" /></div>
    </div>

    <div class="section-heading"><h2>Theme signatures</h2><RouterLink to="/themes">Inspect tokens</RouterLink></div>
    <div class="theme-signatures">
      <button v-for="theme in themes" :key="theme.id" :class="theme.id" type="button" @click="$router.push(`/themes?theme=${theme.id}`)">
        <span class="theme-dots"><i v-for="swatch in theme.swatches" :key="swatch" :style="{ background: swatch }" /></span>
        <strong>{{ theme.name }}</strong><small>{{ theme.nameZh }}</small>
      </button>
    </div>

    <div class="section-heading"><h2>Component inventory</h2><span>Complete official index</span></div>
    <div class="inventory-list">
      <section v-for="category in vueCategories" :key="category">
        <div><strong>{{ category }}</strong><span>{{ catalogByCategory(category).length }}</span></div>
        <p>{{ catalogByCategory(category).slice(0, 5).map((entry) => entry.name).join(' · ') }}<template v-if="catalogByCategory(category).length > 5"> · …</template></p>
        <RouterLink :to="`/components?category=${category}`" :aria-label="`查看 ${category}`"><ArrowRight /></RouterLink>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 28px; }
.eyebrow { display: block; margin-bottom: 9px; color: var(--primary); font-size: 10px; font-weight: 750; }
.coverage-lockup { min-width: 145px; text-align: right; }.coverage-lockup strong { display: block; font-size: 28px; line-height: 1; }.coverage-lockup span { display: flex; justify-content: flex-end; align-items: center; gap: 5px; margin-top: 7px; color: var(--muted-foreground); font-size: 10px; }.coverage-lockup svg { width: 13px; }
.dashboard-strip { display: flex; min-height: 50px; align-items: center; gap: 24px; padding: 0 16px; border-block: 1px solid var(--border); color: var(--muted-foreground); font-size: 11px; }.dashboard-strip div, .dashboard-strip a { display: flex; align-items: center; gap: 7px; }.dashboard-strip svg { width: 15px; }.dashboard-strip a { margin-left: auto; color: var(--primary); font-weight: 650; text-decoration: none; }
.dashboard-preview { display: grid; grid-template-columns: 1.1fr 1px minmax(220px, .8fr) minmax(240px, .9fr); align-items: center; gap: 24px; }.preview-divider { width: 1px; height: 150px; background: var(--border); }.quick-form { display: grid; }.quick-form :deep(.el-form-item) { margin-bottom: 11px; }.status-sample { display: grid; gap: 22px; }
.theme-signatures { display: grid; grid-template-columns: repeat(5, 1fr); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }.theme-signatures button { min-width: 0; padding: 16px; border: 0; border-right: 1px solid var(--border); background: var(--card); color: var(--card-foreground); text-align: left; }.theme-signatures button:last-child { border-right: 0; }.theme-signatures button:hover { background: var(--accent); }.theme-signatures strong, .theme-signatures small { display: block; }.theme-signatures strong { margin-top: 12px; font-size: 12px; }.theme-signatures small { margin-top: 3px; color: var(--muted-foreground); font-size: 10px; }.theme-dots { display: flex; }.theme-dots i { width: 24px; height: 24px; border: 2px solid var(--card); border-radius: 50%; }.theme-dots i + i { margin-left: -6px; }
.inventory-list { border-top: 1px solid var(--border); }.inventory-list section { display: grid; grid-template-columns: 170px 1fr 32px; align-items: center; gap: 18px; min-height: 66px; border-bottom: 1px solid var(--border); }.inventory-list section > div { display: flex; align-items: center; justify-content: space-between; }.inventory-list section span { color: var(--muted-foreground); font-size: 11px; }.inventory-list p { margin: 0; color: var(--muted-foreground); font-size: 11px; line-height: 1.5; }.inventory-list a { display: grid; place-items: center; color: var(--primary); }.inventory-list svg { width: 16px; }
@media (max-width: 900px) { .dashboard-preview { grid-template-columns: 1fr 1fr; }.dashboard-preview > :first-child { grid-column: 1 / -1; }.preview-divider { display: none; }.theme-signatures { grid-template-columns: repeat(3, 1fr); }.theme-signatures button { border-bottom: 1px solid var(--border); } }
@media (max-width: 620px) { .dashboard-heading { align-items: flex-start; flex-direction: column; }.coverage-lockup { text-align: left; }.coverage-lockup span { justify-content: flex-start; }.dashboard-strip { align-items: flex-start; flex-direction: column; gap: 10px; padding-block: 13px; }.dashboard-strip a { margin-left: 0; }.dashboard-preview { grid-template-columns: 1fr; }.theme-signatures { grid-template-columns: 1fr 1fr; }.inventory-list section { grid-template-columns: 1fr 28px; padding: 12px 0; }.inventory-list section p { grid-column: 1; }.inventory-list section a { grid-column: 2; grid-row: 1 / 3; } }
</style>
