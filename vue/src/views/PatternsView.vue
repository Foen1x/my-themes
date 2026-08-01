<script setup lang="ts">
import { Bell, MoreFilled, Plus, Search, Setting, User } from '@element-plus/icons-vue'
import { ref } from 'vue'

const tab = ref('dashboard')
const notifications = ref(true)
const rows = [
  { component: 'Button', coverage: '12 states', owner: 'Core UI', status: 'Ready' },
  { component: 'Data Table', coverage: '8 states', owner: 'Product', status: 'Review' },
  { component: 'Date Picker', coverage: '10 states', owner: 'Forms', status: 'Ready' },
]
</script>

<template>
  <div>
    <header class="page-heading"><h1>Product patterns</h1><p>把基础组件放进实际工作流，检查信息密度、表单节奏、数据状态和响应式导航。</p></header>
    <el-segmented v-model="tab" :options="[{ label: 'Dashboard', value: 'dashboard' }, { label: 'Settings', value: 'settings' }, { label: 'Feedback', value: 'feedback' }]" />

    <section v-if="tab === 'dashboard'" class="pattern-canvas">
      <header class="pattern-toolbar"><div><strong>Component operations</strong><span>Workspace health and review queue</span></div><el-input placeholder="Search components" :prefix-icon="Search" /><el-button :icon="Bell" circle aria-label="Notifications" /><el-button type="primary" :icon="Plus">New review</el-button></header>
      <div class="metric-row"><div><span>Coverage</span><strong>82/82</strong><small>All routes active</small></div><div><span>Open reviews</span><strong>7</strong><small>2 due today</small></div><div><span>Theme checks</span><strong>96%</strong><small>Across 5 palettes</small></div></div>
      <div class="chart-panel"><div class="chart-title"><strong>Review throughput</strong><el-button :icon="MoreFilled" text circle aria-label="Chart actions" /></div><div class="bars"><i v-for="height in [35, 48, 43, 70, 56, 81, 65, 88, 72, 91, 78, 96]" :key="height" :style="{ height: `${height}%` }" /></div></div>
      <el-table :data="rows" stripe><el-table-column prop="component" label="Component" min-width="150" /><el-table-column prop="coverage" label="Coverage" /><el-table-column prop="owner" label="Owner" /><el-table-column prop="status" label="Status"><template #default="scope"><el-tag :type="scope.row.status === 'Ready' ? 'success' : 'warning'">{{ scope.row.status }}</el-tag></template></el-table-column><el-table-column width="48"><template #default><el-button :icon="MoreFilled" text circle aria-label="Row actions" /></template></el-table-column></el-table>
    </section>

    <section v-else-if="tab === 'settings'" class="pattern-canvas settings-pattern">
      <aside><button class="active"><User /> Profile</button><button><Bell /> Notifications</button><button><Setting /> Appearance</button></aside>
      <el-form label-position="top"><h2>Workspace settings</h2><p>Manage the identity and review defaults used by the theme catalog.</p><div class="field-grid"><el-form-item label="Workspace name"><el-input model-value="Theme Lab" /></el-form-item><el-form-item label="Default framework"><el-select model-value="vue"><el-option label="Vue" value="vue" /><el-option label="React" value="react" /></el-select></el-form-item></div><el-form-item label="Review notes"><el-input type="textarea" :rows="4" model-value="Check contrast, keyboard focus, and compact layouts." /></el-form-item><div class="setting-row"><div><strong>Email review summary</strong><span>Receive one digest after catalog checks complete.</span></div><el-switch v-model="notifications" /></div><el-button type="primary">Save changes</el-button></el-form>
    </section>

    <section v-else class="pattern-canvas feedback-pattern"><el-result icon="success" title="Catalog check complete" sub-title="82 component routes and five semantic themes passed validation."><template #extra><el-button type="primary">View report</el-button><el-button>Run again</el-button></template></el-result><div class="feedback-list"><el-alert title="No missing previews" type="success" show-icon /><el-alert title="Two color pairs are close to the review threshold" type="warning" show-icon /><el-alert title="Bundle report is available" type="info" show-icon /></div></section>
  </div>
</template>

<style scoped>
.pattern-canvas { margin-top: 18px; overflow: hidden; border: 1px solid var(--border); border-radius: 8px; background: var(--card); box-shadow: var(--shadow-soft); }.pattern-toolbar { display: flex; min-height: 68px; align-items: center; gap: 8px; padding: 12px 16px; border-bottom: 1px solid var(--border); }.pattern-toolbar > div { min-width: 180px; margin-right: auto; }.pattern-toolbar strong, .pattern-toolbar span { display: block; }.pattern-toolbar strong { font-size: 13px; }.pattern-toolbar span { margin-top: 3px; color: var(--muted-foreground); font-size: 9px; }.pattern-toolbar :deep(.el-input) { width: 220px; }
.metric-row { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--border); }.metric-row div { padding: 18px; border-right: 1px solid var(--border); }.metric-row div:last-child { border-right: 0; }.metric-row span, .metric-row strong, .metric-row small { display: block; }.metric-row span { color: var(--muted-foreground); font-size: 10px; }.metric-row strong { margin-top: 8px; font-size: 24px; }.metric-row small { margin-top: 4px; color: var(--muted-foreground); font-size: 9px; }
.chart-panel { padding: 16px; border-bottom: 1px solid var(--border); }.chart-title { display: flex; align-items: center; justify-content: space-between; font-size: 11px; }.bars { display: flex; height: 150px; align-items: end; gap: 8px; padding-top: 20px; }.bars i { flex: 1; min-width: 4px; border-radius: 3px 3px 0 0; background: var(--primary); opacity: .78; }
.settings-pattern { display: grid; grid-template-columns: 190px 1fr; min-height: 520px; }.settings-pattern aside { display: grid; align-content: start; gap: 4px; padding: 14px; border-right: 1px solid var(--border); background: var(--muted); }.settings-pattern aside button { display: flex; height: 34px; align-items: center; gap: 8px; padding: 0 9px; border: 0; border-radius: 5px; background: transparent; color: var(--muted-foreground); text-align: left; }.settings-pattern aside button.active { background: var(--card); color: var(--foreground); }.settings-pattern aside svg { width: 14px; }.settings-pattern form { padding: 28px; }.settings-pattern h2 { margin: 0; font-size: 18px; }.settings-pattern form > p { margin: 6px 0 24px; color: var(--muted-foreground); font-size: 11px; }.field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }.setting-row { display: flex; align-items: center; justify-content: space-between; margin: 7px 0 22px; padding: 14px 0; border-block: 1px solid var(--border); }.setting-row strong, .setting-row span { display: block; }.setting-row strong { font-size: 11px; }.setting-row span { margin-top: 3px; color: var(--muted-foreground); font-size: 9px; }
.feedback-pattern { display: grid; grid-template-columns: 1fr .8fr; align-items: center; padding: 18px; }.feedback-list { display: grid; gap: 10px; }
@media (max-width: 720px) { .pattern-toolbar { align-items: stretch; flex-wrap: wrap; }.pattern-toolbar > div { width: 100%; }.pattern-toolbar :deep(.el-input) { width: auto; flex: 1; }.metric-row { grid-template-columns: 1fr; }.metric-row div { border-right: 0; border-bottom: 1px solid var(--border); }.settings-pattern { grid-template-columns: 1fr; }.settings-pattern aside { grid-template-columns: repeat(3, 1fr); border-right: 0; border-bottom: 1px solid var(--border); }.settings-pattern aside button { justify-content: center; padding: 0; font-size: 0; }.settings-pattern aside svg { width: 16px; }.settings-pattern form { padding: 20px; }.field-grid, .feedback-pattern { grid-template-columns: 1fr; } }
</style>
