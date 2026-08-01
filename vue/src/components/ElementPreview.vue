<script setup lang="ts">
import {
  Bell,
  Check,
  Delete,
  Edit,
  HomeFilled,
  MoreFilled,
  Plus,
  Search,
  Setting,
  Star,
  UploadFilled,
  User,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { computed, ref } from 'vue'

const props = defineProps<{ slug: string; compact?: boolean }>()

const input = ref('Theme-aware content')
const number = ref(28)
const checked = ref(['Design'])
const choice = ref('Vue')
const select = ref('spring')
const slider = ref(54)
const enabled = ref(true)
const rating = ref(4)
const date = ref('2026-08-01')
const dateTime = ref('2026-08-01 09:30:00')
const time = ref('09:30:00')
const tags = ref(['Design', 'System'])
const otp = ref('123456')
const color = ref('#4E9D77')
const activeTab = ref('preview')
const activeCollapse = ref(['1'])
const currentPage = ref(2)
const progress = ref(64)
const dialogOpen = ref(false)
const drawerOpen = ref(false)
const tourOpen = ref(false)
const tourTarget = ref<HTMLElement>()
const transferValue = ref([1])
const cascaderValue = ref(['design', 'theme'])
const treeValue = ref('ui')
const menuActive = ref('1')
const segmented = ref('Preview')
const tableRows = [
  { name: 'Spring', owner: 'Design', status: 'Published' },
  { name: 'Morning Light', owner: 'Product', status: 'Review' },
  { name: 'Night', owner: 'Platform', status: 'Draft' },
]
const treeData = [
  { value: 'design', label: 'Design system', children: [{ value: 'ui', label: 'UI components' }] },
  { value: 'product', label: 'Product surfaces' },
]
const cascaderOptions = [
  { value: 'design', label: 'Design', children: [{ value: 'theme', label: 'Theme Lab' }] },
  { value: 'engineering', label: 'Engineering', children: [{ value: 'web', label: 'Web' }] },
]
const transferData = [1, 2, 3, 4].map((key) => ({ key, label: `Token group ${key}` }))
const virtualRows = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  name: `Component ${String(index + 1).padStart(2, '0')}`,
  state: index % 2 ? 'Ready' : 'Review',
}))
const virtualColumns = [
  { key: 'name', dataKey: 'name', title: 'Component', width: 240 },
  { key: 'state', dataKey: 'state', title: 'State', width: 160 },
]
const uploadFileList = ref([{ name: 'theme-tokens.json', status: 'success' }])

const inputLike = computed(() =>
  ['input', 'autocomplete', 'mention'].includes(props.slug),
)

function suggest(_query: string, callback: (items: { value: string }[]) => void) {
  callback([{ value: 'Spring theme' }, { value: 'Sunshine theme' }, { value: 'Night theme' }])
}

function notify(kind: 'message' | 'box' | 'notification') {
  if (kind === 'message') ElMessage.success('Theme tokens published')
  if (kind === 'notification') {
    ElNotification({ title: 'Sync complete', message: '82 component previews are current.', type: 'success' })
  }
  if (kind === 'box') {
    void ElMessageBox.confirm('Publish this theme to the shared catalog?', 'Confirm publish', {
      confirmButtonText: 'Publish',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
  }
}
</script>

<template>
  <div class="element-preview" :class="{ compact }">
    <template v-if="slug === 'button'">
      <el-button type="primary">Primary</el-button>
      <el-button>Default</el-button>
      <el-button type="success" :icon="Check">Approved</el-button>
      <el-button type="danger" plain :icon="Delete">Delete</el-button>
      <el-button circle :icon="MoreFilled" aria-label="More actions" />
    </template>

    <template v-else-if="slug === 'border'">
      <div v-for="radius in ['0', '4px', '8px', '14px']" :key="radius" class="border-sample" :style="{ borderRadius: radius }">
        {{ radius }}
      </div>
    </template>

    <template v-else-if="slug === 'color'">
      <div v-for="token in ['primary', 'success', 'warning', 'destructive', 'info']" :key="token" class="color-sample">
        <span :style="{ background: `var(--${token})` }" />{{ token }}
      </div>
    </template>

    <template v-else-if="slug === 'container'">
      <el-container class="container-demo">
        <el-header>Header</el-header>
        <el-container><el-aside width="120px">Aside</el-aside><el-main>Main</el-main></el-container>
      </el-container>
    </template>

    <template v-else-if="slug === 'icon'">
      <el-icon v-for="icon in [Search, Edit, Bell, Setting, Star]" :key="icon.name" :size="24"><component :is="icon" /></el-icon>
    </template>

    <template v-else-if="slug === 'layout'">
      <el-row :gutter="12" class="layout-demo"><el-col :span="8"><span>8</span></el-col><el-col :span="10"><span>10</span></el-col><el-col :span="6"><span>6</span></el-col></el-row>
    </template>

    <template v-else-if="slug === 'link'">
      <el-link type="primary" :underline="false">Documentation</el-link>
      <el-link type="success">Published</el-link>
      <el-link type="danger" disabled>Unavailable</el-link>
    </template>

    <template v-else-if="slug === 'text'">
      <el-text type="primary">Primary text</el-text><el-text type="success">Success text</el-text><el-text truncated style="max-width: 210px">Long content truncates without shifting the layout</el-text>
    </template>

    <template v-else-if="slug === 'scrollbar'">
      <el-scrollbar height="150px" class="scroll-demo"><p v-for="item in 12" :key="item">Component row {{ item }}</p></el-scrollbar>
    </template>

    <template v-else-if="slug === 'space'">
      <el-space wrap :size="12"><el-button v-for="item in 6" :key="item">Action {{ item }}</el-button></el-space>
    </template>

    <template v-else-if="slug === 'splitter'">
      <el-splitter class="splitter-demo"><el-splitter-panel size="38%"><div>Navigation</div></el-splitter-panel><el-splitter-panel><div>Inspector</div></el-splitter-panel></el-splitter>
    </template>

    <template v-else-if="slug === 'typography'">
      <div class="type-ramp"><h2>Component typography</h2><p>Semantic tokens keep interface copy readable across all five themes.</p><code>--color-primary</code></div>
    </template>

    <template v-else-if="slug === 'config-provider'">
      <el-config-provider size="small"><el-space><el-button type="primary">Small controls</el-button><el-input v-model="input" style="width: 210px" /></el-space></el-config-provider>
    </template>

    <template v-else-if="inputLike">
      <el-autocomplete v-if="slug === 'autocomplete'" v-model="input" :fetch-suggestions="suggest" placeholder="Search themes" style="width: min(360px, 100%)" />
      <el-mention v-else-if="slug === 'mention'" v-model="input" :options="[{ value: 'design', label: 'Design team' }, { value: 'platform', label: 'Platform team' }]" placeholder="Mention a team with @" style="width: min(420px, 100%)" />
      <el-input v-else v-model="input" placeholder="Enter a component label" clearable style="width: min(420px, 100%)"><template #prepend>Label</template></el-input>
    </template>

    <template v-else-if="slug === 'cascader'">
      <el-cascader v-model="cascaderValue" :options="cascaderOptions" clearable />
    </template>

    <template v-else-if="slug === 'checkbox'">
      <el-checkbox-group v-model="checked"><el-checkbox value="Design">Design</el-checkbox><el-checkbox value="Code">Code</el-checkbox><el-checkbox value="QA">QA</el-checkbox></el-checkbox-group>
    </template>

    <template v-else-if="slug === 'color-picker' || slug === 'color-picker-panel'">
      <el-color-picker v-model="color" show-alpha :predefine="['#4E9D77', '#438EC1', '#E06C2D', '#172033']" /><span class="value-readout">{{ color }}</span>
    </template>

    <template v-else-if="['date-picker', 'date-picker-panel'].includes(slug)">
      <el-date-picker v-model="date" type="date" value-format="YYYY-MM-DD" placeholder="Pick a date" />
    </template>

    <template v-else-if="slug === 'date-time-picker'">
      <el-date-picker v-model="dateTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="Pick date and time" />
    </template>

    <template v-else-if="slug === 'form'">
      <el-form label-position="top" class="form-demo"><el-form-item label="Theme name" required><el-input v-model="input" /></el-form-item><el-form-item label="Status"><el-select v-model="select"><el-option label="Spring" value="spring" /><el-option label="Night" value="night" /></el-select></el-form-item><el-button type="primary">Save theme</el-button></el-form>
    </template>

    <template v-else-if="slug === 'input-number'">
      <el-input-number v-model="number" :min="0" :max="100" /><span class="value-readout">Opacity {{ number }}%</span>
    </template>

    <template v-else-if="slug === 'input-tag'">
      <el-input-tag v-model="tags" placeholder="Add token group" style="width: min(420px, 100%)" />
    </template>

    <template v-else-if="slug === 'input-otp'">
      <el-input-otp v-model="otp" :maxlength="6" />
    </template>

    <template v-else-if="slug === 'radio'">
      <el-radio-group v-model="choice"><el-radio-button value="Vue">Vue</el-radio-button><el-radio-button value="React">React</el-radio-button><el-radio-button value="Tokens">Tokens</el-radio-button></el-radio-group>
    </template>

    <template v-else-if="slug === 'rate'">
      <el-rate v-model="rating" show-text :texts="['Poor', 'Fair', 'Good', 'Great', 'Excellent']" />
    </template>

    <template v-else-if="slug === 'select'">
      <el-select v-model="select" placeholder="Select theme" style="width: 230px"><el-option label="Spring" value="spring" /><el-option label="Morning Light" value="morning" /><el-option label="Night" value="night" /></el-select>
    </template>

    <template v-else-if="slug === 'virtualized-select'">
      <el-select-v2 v-model="select" :options="Array.from({ length: 1000 }, (_, i) => ({ label: `Token ${i + 1}`, value: `${i}` }))" placeholder="1,000 virtual options" style="width: 240px" />
    </template>

    <template v-else-if="slug === 'slider'">
      <div class="wide-control"><el-slider v-model="slider" show-input /></div>
    </template>

    <template v-else-if="slug === 'switch'">
      <el-switch v-model="enabled" inline-prompt active-text="On" inactive-text="Off" /><span class="value-readout">Live preview {{ enabled ? 'enabled' : 'paused' }}</span>
    </template>

    <template v-else-if="slug === 'time-picker'">
      <el-time-picker v-model="time" value-format="HH:mm:ss" placeholder="Select time" />
    </template>

    <template v-else-if="slug === 'time-select'">
      <el-time-select v-model="time" start="08:00" step="00:30" end="18:00" placeholder="Select time" />
    </template>

    <template v-else-if="slug === 'transfer'">
      <el-transfer v-model="transferValue" :data="transferData" :titles="['Available', 'Applied']" />
    </template>

    <template v-else-if="slug === 'tree-select'">
      <el-tree-select v-model="treeValue" :data="treeData" check-strictly style="width: 260px" />
    </template>

    <template v-else-if="slug === 'upload'">
      <el-upload v-model:file-list="uploadFileList" action="#" :auto-upload="false" drag><el-icon class="el-icon--upload"><UploadFilled /></el-icon><div>Drop a token file here or <em>browse</em></div></el-upload>
    </template>

    <template v-else-if="slug === 'avatar'">
      <el-avatar :size="48" :icon="User" /><el-avatar :size="48" style="background: var(--primary)">TL</el-avatar><el-avatar shape="square">UI</el-avatar>
    </template>

    <template v-else-if="slug === 'badge'">
      <el-badge :value="12"><el-button>Reviews</el-button></el-badge><el-badge is-dot type="success"><el-button :icon="Bell" circle aria-label="Notifications" /></el-badge>
    </template>

    <template v-else-if="slug === 'calendar'">
      <el-calendar class="calendar-demo"><template #date-cell="{ data }"><span>{{ data.day.split('-').slice(2).join('') }}</span><i v-if="data.day === '2026-08-01'" /></template></el-calendar>
    </template>

    <template v-else-if="slug === 'card'">
      <el-card class="card-demo" shadow="hover"><template #header><strong>Theme health</strong></template><p>All semantic tokens resolve correctly.</p><el-tag type="success">Ready</el-tag></el-card>
    </template>

    <template v-else-if="slug === 'carousel'">
      <el-carousel height="180px" class="carousel-demo"><el-carousel-item v-for="item in ['Spring', 'Sunshine', 'Night']" :key="item"><strong>{{ item }}</strong></el-carousel-item></el-carousel>
    </template>

    <template v-else-if="slug === 'collapse'">
      <el-collapse v-model="activeCollapse"><el-collapse-item title="Semantic colors" name="1">Primary, accent, status, and chart tokens.</el-collapse-item><el-collapse-item title="Surface system" name="2">Background, card, popover, and sidebar surfaces.</el-collapse-item></el-collapse>
    </template>

    <template v-else-if="slug === 'descriptions'">
      <el-descriptions title="Theme manifest" :column="compact ? 1 : 3" border><el-descriptions-item label="Name">Spring</el-descriptions-item><el-descriptions-item label="Tokens">42</el-descriptions-item><el-descriptions-item label="Status"><el-tag type="success">Published</el-tag></el-descriptions-item></el-descriptions>
    </template>

    <template v-else-if="slug === 'empty'">
      <el-empty description="No saved component states"><el-button type="primary">Create state</el-button></el-empty>
    </template>

    <template v-else-if="slug === 'image'">
      <el-image class="image-demo" src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80" fit="cover" :preview-src-list="['https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=85']" />
    </template>

    <template v-else-if="slug === 'infinite-scroll'">
      <ul v-infinite-scroll="() => undefined" class="infinite-list"><li v-for="item in 12" :key="item">Loaded component {{ item }}</li></ul>
    </template>

    <template v-else-if="slug === 'pagination'">
      <el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :total="80" />
    </template>

    <template v-else-if="slug === 'progress'">
      <div class="progress-demo"><el-progress :percentage="progress" /><el-progress type="circle" :percentage="progress" :width="96" /></div>
    </template>

    <template v-else-if="slug === 'result'">
      <el-result icon="success" title="Theme published" sub-title="The shared token package has been updated."><template #extra><el-button type="primary">View release</el-button></template></el-result>
    </template>

    <template v-else-if="slug === 'skeleton'">
      <el-skeleton :rows="4" animated />
    </template>

    <template v-else-if="slug === 'table'">
      <el-table :data="tableRows" stripe><el-table-column prop="name" label="Theme" min-width="150" /><el-table-column prop="owner" label="Owner" /><el-table-column prop="status" label="Status"><template #default="scope"><el-tag :type="scope.row.status === 'Published' ? 'success' : 'info'">{{ scope.row.status }}</el-tag></template></el-table-column></el-table>
    </template>

    <template v-else-if="slug === 'virtualized-table'">
      <el-table-v2 :columns="virtualColumns" :data="virtualRows" :width="compact ? 320 : 620" :height="260" fixed />
    </template>

    <template v-else-if="slug === 'tag'">
      <el-tag>Default</el-tag><el-tag type="success" effect="dark">Published</el-tag><el-tag type="warning" closable>Review</el-tag><el-tag round>v2.14</el-tag>
    </template>

    <template v-else-if="slug === 'timeline'">
      <el-timeline><el-timeline-item timestamp="09:24" type="success">Tokens validated</el-timeline-item><el-timeline-item timestamp="09:12" type="primary">Preview generated</el-timeline-item><el-timeline-item timestamp="08:48">Theme updated</el-timeline-item></el-timeline>
    </template>

    <template v-else-if="slug === 'tour'">
      <el-button ref="tourTarget" type="primary" @click="tourOpen = true">Start tour</el-button><el-tour v-model="tourOpen"><el-tour-step :target="tourTarget" title="Theme switcher" description="Use this control to inspect all semantic palettes." /></el-tour>
    </template>

    <template v-else-if="slug === 'tree'">
      <el-tree :data="treeData" default-expand-all node-key="value" />
    </template>

    <template v-else-if="slug === 'virtualized-tree'">
      <el-tree-v2 :data="treeData" :height="240" :props="{ value: 'value', label: 'label', children: 'children' }" />
    </template>

    <template v-else-if="slug === 'statistic'">
      <el-row :gutter="24" style="width: 100%"><el-col :span="8"><el-statistic title="Components" :value="82" /></el-col><el-col :span="8"><el-statistic title="Themes" :value="5" /></el-col><el-col :span="8"><el-countdown title="Review window" :value="Date.now() + 1000 * 60 * 60" /></el-col></el-row>
    </template>

    <template v-else-if="slug === 'segmented'">
      <el-segmented v-model="segmented" :options="['Preview', 'Tokens', 'Code']" />
    </template>

    <template v-else-if="slug === 'affix'">
      <div class="affix-demo"><el-affix :offset="80" target=".affix-demo"><el-button type="primary">Pinned action</el-button></el-affix><p>Scroll this panel to test the affix target.</p></div>
    </template>

    <template v-else-if="slug === 'anchor'">
      <el-anchor direction="horizontal"><el-anchor-link href="#tokens" title="Tokens" /><el-anchor-link href="#states" title="States" /><el-anchor-link href="#usage" title="Usage" /></el-anchor>
    </template>

    <template v-else-if="slug === 'backtop'">
      <p>Scroll the page, then use the themed back-to-top control.</p><el-backtop :right="32" :bottom="32" />
    </template>

    <template v-else-if="slug === 'breadcrumb'">
      <el-breadcrumb separator="/"><el-breadcrumb-item :to="{ path: '/' }"><el-icon><HomeFilled /></el-icon> Home</el-breadcrumb-item><el-breadcrumb-item>Components</el-breadcrumb-item><el-breadcrumb-item>Breadcrumb</el-breadcrumb-item></el-breadcrumb>
    </template>

    <template v-else-if="slug === 'dropdown'">
      <el-dropdown><el-button type="primary">Theme actions <el-icon class="el-icon--right"><MoreFilled /></el-icon></el-button><template #dropdown><el-dropdown-menu><el-dropdown-item :icon="Edit">Rename</el-dropdown-item><el-dropdown-item :icon="Plus">Duplicate</el-dropdown-item><el-dropdown-item divided :icon="Delete">Archive</el-dropdown-item></el-dropdown-menu></template></el-dropdown>
    </template>

    <template v-else-if="slug === 'menu'">
      <el-menu v-model:default-active="menuActive" mode="horizontal" class="menu-demo"><el-menu-item index="1">Overview</el-menu-item><el-menu-item index="2">Tokens</el-menu-item><el-sub-menu index="3"><template #title>Components</template><el-menu-item index="3-1">Form</el-menu-item><el-menu-item index="3-2">Data</el-menu-item></el-sub-menu></el-menu>
    </template>

    <template v-else-if="slug === 'page-header'">
      <el-page-header title="Components" content="Page Header"><template #extra><el-button type="primary">Publish</el-button></template></el-page-header>
    </template>

    <template v-else-if="slug === 'steps'">
      <el-steps :active="2" finish-status="success"><el-step title="Design" /><el-step title="Review" /><el-step title="Publish" /></el-steps>
    </template>

    <template v-else-if="slug === 'tabs'">
      <el-tabs v-model="activeTab"><el-tab-pane label="Preview" name="preview">Live component surface</el-tab-pane><el-tab-pane label="Tokens" name="tokens">Semantic token mapping</el-tab-pane><el-tab-pane label="Accessibility" name="a11y">Keyboard and contrast notes</el-tab-pane></el-tabs>
    </template>

    <template v-else-if="slug === 'alert'">
      <div class="alert-stack"><el-alert title="Theme compiled successfully" type="success" show-icon /><el-alert title="Two contrast pairs need review" type="warning" show-icon /></div>
    </template>

    <template v-else-if="slug === 'dialog'">
      <el-button type="primary" @click="dialogOpen = true">Open dialog</el-button><el-dialog v-model="dialogOpen" title="Publish theme" width="min(480px, 90vw)"><p>Publish Spring to the shared component catalog?</p><template #footer><el-button @click="dialogOpen = false">Cancel</el-button><el-button type="primary" @click="dialogOpen = false">Publish</el-button></template></el-dialog>
    </template>

    <template v-else-if="slug === 'drawer'">
      <el-button type="primary" @click="drawerOpen = true">Open inspector</el-button><el-drawer v-model="drawerOpen" title="Token inspector" size="min(420px, 88vw)"><el-form label-position="top"><el-form-item label="Primary color"><el-color-picker v-model="color" /></el-form-item><el-form-item label="Radius"><el-slider v-model="slider" /></el-form-item></el-form></el-drawer>
    </template>

    <template v-else-if="slug === 'loading'">
      <div v-loading="true" element-loading-text="Compiling tokens" class="loading-demo">Preview surface</div>
    </template>

    <template v-else-if="slug === 'message'">
      <el-button type="success" @click="notify('message')">Show message</el-button>
    </template>

    <template v-else-if="slug === 'message-box'">
      <el-button type="warning" @click="notify('box')">Confirm publish</el-button>
    </template>

    <template v-else-if="slug === 'notification'">
      <el-button type="primary" @click="notify('notification')">Show notification</el-button>
    </template>

    <template v-else-if="slug === 'popconfirm'">
      <el-popconfirm title="Archive this theme?" confirm-button-text="Archive" cancel-button-text="Cancel"><template #reference><el-button type="danger" plain>Archive</el-button></template></el-popconfirm>
    </template>

    <template v-else-if="slug === 'popover'">
      <el-popover placement="top" title="Token details" :width="260" trigger="click" content="primary · oklch(0.58 0.13 160)"><template #reference><el-button>Inspect token</el-button></template></el-popover>
    </template>

    <template v-else-if="slug === 'tooltip'">
      <el-tooltip content="Copy semantic token" placement="top"><el-button :icon="Edit" circle aria-label="Copy semantic token" /></el-tooltip>
    </template>

    <template v-else-if="slug === 'divider'">
      <div class="divider-demo"><span>Theme sections stay visually quiet.</span><el-divider content-position="left">Semantic tokens</el-divider><span>Colors, radius, elevation, and typography.</span></div>
    </template>

    <template v-else-if="slug === 'watermark'">
      <el-watermark content="Theme Lab" :font="{ color: 'var(--muted-foreground)' }" class="watermark-demo"><div>Protected preview<br><small>Internal design system</small></div></el-watermark>
    </template>
  </div>
</template>

<style scoped>
.element-preview { display: flex; min-width: 0; min-height: 170px; align-items: center; gap: 14px; flex-wrap: wrap; }
.element-preview.compact { min-height: 116px; }
.border-sample { display: grid; width: 88px; height: 70px; place-items: center; border: 1px solid var(--border); background: var(--muted); color: var(--muted-foreground); font-size: 11px; }
.color-sample { display: grid; min-width: 84px; gap: 7px; color: var(--muted-foreground); font-size: 11px; }
.color-sample span { width: 64px; height: 46px; border: 1px solid color-mix(in oklch, var(--foreground), transparent 90%); border-radius: 6px; }
.container-demo { width: 100%; height: 190px; border: 1px solid var(--border); }
.container-demo .el-header, .container-demo .el-aside, .container-demo .el-main { display: grid; place-items: center; }
.container-demo .el-header, .container-demo .el-aside { background: var(--muted); color: var(--muted-foreground); }
.layout-demo { width: 100%; }
.layout-demo span { display: grid; height: 58px; place-items: center; border-radius: 5px; background: var(--accent); color: var(--accent-foreground); }
.scroll-demo, .splitter-demo { width: 100%; border: 1px solid var(--border); }
.scroll-demo p { margin: 0; padding: 9px 13px; border-bottom: 1px solid var(--border); }
.splitter-demo { height: 180px; }
.splitter-demo div { display: grid; height: 100%; place-items: center; color: var(--muted-foreground); }
.type-ramp h2 { margin: 0 0 8px; font-size: 24px; }.type-ramp p { margin: 0 0 12px; color: var(--muted-foreground); }.type-ramp code { color: var(--primary); }
.value-readout { color: var(--muted-foreground); font-size: 12px; }
.form-demo { width: min(440px, 100%); }
.wide-control { width: min(620px, 100%); }
.card-demo { width: min(360px, 100%); }.card-demo p { color: var(--muted-foreground); }
.calendar-demo { width: 100%; }.calendar-demo :deep(.el-calendar__body) { padding: 8px 12px; }.calendar-demo :deep(.el-calendar-table .el-calendar-day) { height: 44px; }.calendar-demo i { display: block; width: 5px; height: 5px; margin-top: 4px; border-radius: 50%; background: var(--primary); }
.carousel-demo { width: min(620px, 100%); }.carousel-demo :deep(.el-carousel__item) { display: grid; place-items: center; background: var(--accent); color: var(--accent-foreground); }.carousel-demo :deep(.el-carousel__item:nth-child(2)) { background: var(--secondary); }.carousel-demo strong { font-size: 22px; }
.image-demo { width: min(520px, 100%); height: 210px; border-radius: 7px; }
.infinite-list { width: min(420px, 100%); height: 190px; overflow: auto; margin: 0; padding: 0; border: 1px solid var(--border); list-style: none; }.infinite-list li { padding: 9px 12px; border-bottom: 1px solid var(--border); }
.progress-demo { display: flex; width: min(620px, 100%); align-items: center; gap: 28px; }.progress-demo > :first-child { flex: 1; }
.affix-demo { width: 100%; height: 190px; overflow: auto; padding: 12px; border: 1px solid var(--border); }.affix-demo p { height: 320px; color: var(--muted-foreground); }
.menu-demo { width: 100%; }.alert-stack { display: grid; width: min(620px, 100%); gap: 12px; }.loading-demo { display: grid; width: min(460px, 100%); height: 150px; place-items: center; border: 1px solid var(--border); color: var(--muted-foreground); }
.divider-demo, .watermark-demo { width: min(620px, 100%); }.watermark-demo { display: grid; min-height: 180px; place-items: center; border: 1px solid var(--border); text-align: center; }.watermark-demo small { color: var(--muted-foreground); }
@media (max-width: 620px) { .element-preview { align-items: flex-start; }.progress-demo { align-items: flex-start; flex-direction: column; }.element-preview :deep(.el-transfer) { display: grid; gap: 10px; }.element-preview :deep(.el-transfer__buttons) { transform: rotate(90deg); }.calendar-demo :deep(.el-calendar__header) { padding: 8px; }.calendar-demo :deep(.el-calendar-table .el-calendar-day) { height: 34px; padding: 4px; } }
</style>
