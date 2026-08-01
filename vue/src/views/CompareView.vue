<script setup lang="ts">
import { themes, type ThemeId } from '@my-themes/theme-contract'
import { ref } from 'vue'
import ElementPreview from '@/components/ElementPreview.vue'

const left = ref<ThemeId>('light')
const right = ref<ThemeId>('dark')
</script>

<template>
  <div>
    <header class="page-heading"><h1>Theme comparison</h1><p>同一组组件、相同空间和状态，并排比较两套主题。每个预览区域独立继承主题变量。</p></header>
    <div class="compare-controls"><label>Left<select v-model="left"><option v-for="theme in themes" :key="theme.id" :value="theme.id">{{ theme.name }} / {{ theme.nameZh }}</option></select></label><label>Right<select v-model="right"><option v-for="theme in themes" :key="theme.id" :value="theme.id">{{ theme.name }} / {{ theme.nameZh }}</option></select></label></div>
    <div class="compare-grid">
      <section v-for="side in [{ id: left, label: 'A' }, { id: right, label: 'B' }]" :key="side.label" :class="side.id">
        <header><span>{{ side.label }}</span><strong>{{ themes.find((theme) => theme.id === side.id)?.name }}</strong></header>
        <div class="compare-surface"><ElementPreview slug="button" compact /><el-divider /><ElementPreview slug="input" compact /><el-alert title="Semantic status feedback" type="success" show-icon /><el-progress :percentage="68" /></div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.compare-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }.compare-controls label { display: flex; align-items: center; gap: 9px; color: var(--muted-foreground); font-size: 10px; }.compare-controls select { min-width: 0; height: 34px; flex: 1; padding: 0 9px; border: 1px solid var(--border); border-radius: 6px; background: var(--card); color: var(--foreground); }
.compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }.compare-grid > section { min-width: 0; overflow: hidden; border: 1px solid var(--border); border-radius: 8px; background: var(--background); color: var(--foreground); box-shadow: var(--shadow-soft); }.compare-grid header { display: flex; align-items: center; gap: 9px; height: 48px; padding: 0 16px; border-bottom: 1px solid var(--border); background: var(--card); }.compare-grid header span { display: grid; width: 23px; height: 23px; place-items: center; border-radius: 5px; background: var(--primary); color: var(--primary-foreground); font-size: 10px; }.compare-grid header strong { font-size: 12px; }.compare-surface { display: grid; gap: 18px; min-height: 470px; align-content: start; padding: 20px; }.compare-surface :deep(.element-preview) { min-height: 90px; }.compare-surface :deep(.el-divider) { margin: 0; }
@media (max-width: 720px) { .compare-controls, .compare-grid { grid-template-columns: 1fr; }.compare-surface { min-height: auto; } }
</style>
