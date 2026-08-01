export type VueCatalogCategory =
  | 'Basic'
  | 'Configuration'
  | 'Form'
  | 'Data'
  | 'Navigation'
  | 'Feedback'
  | 'Others'

export interface VueCatalogEntry {
  slug: string
  name: string
  nameZh: string
  category: VueCatalogCategory
  description: string
  docsUrl: string
}

type CatalogTuple = readonly [slug: string, name: string, nameZh: string, docsSlug?: string]

function group(category: VueCatalogCategory, entries: readonly CatalogTuple[]): VueCatalogEntry[] {
  return entries.map(([slug, name, nameZh, docsSlug]) => ({
    slug,
    name,
    nameZh,
    category,
    description: `${name} 的主题、状态与交互示例。`,
    docsUrl: `https://element-plus.org/en-US/component/${docsSlug ?? slug}.html`,
  }))
}

export const vueCatalog = [
  ...group('Basic', [
    ['button', 'Button', '按钮'],
    ['border', 'Border', '边框'],
    ['color', 'Color', '色彩'],
    ['container', 'Layout Container', '布局容器', 'container'],
    ['icon', 'Icon', '图标'],
    ['layout', 'Layout', '栅格布局'],
    ['link', 'Link', '链接'],
    ['text', 'Text', '文本'],
    ['scrollbar', 'Scrollbar', '滚动条'],
    ['space', 'Space', '间距'],
    ['splitter', 'Splitter', '分隔面板'],
    ['typography', 'Typography', '排版'],
  ]),
  ...group('Configuration', [['config-provider', 'Config Provider', '全局配置']]),
  ...group('Form', [
    ['autocomplete', 'Autocomplete', '自动补全'],
    ['cascader', 'Cascader', '级联选择'],
    ['checkbox', 'Checkbox', '多选框'],
    ['color-picker-panel', 'Color Picker Panel', '颜色面板'],
    ['color-picker', 'Color Picker', '颜色选择器'],
    ['date-picker-panel', 'Date Picker Panel', '日期面板'],
    ['date-picker', 'Date Picker', '日期选择器'],
    ['date-time-picker', 'DateTime Picker', '日期时间选择器', 'datetime-picker'],
    ['form', 'Form', '表单'],
    ['input', 'Input', '输入框'],
    ['input-number', 'Input Number', '数字输入框'],
    ['input-tag', 'Input Tag', '标签输入框'],
    ['input-otp', 'Input OTP', '验证码输入'],
    ['mention', 'Mention', '提及'],
    ['radio', 'Radio', '单选框'],
    ['rate', 'Rate', '评分'],
    ['select', 'Select', '选择器'],
    ['virtualized-select', 'Virtualized Select', '虚拟化选择器', 'select-v2'],
    ['slider', 'Slider', '滑块'],
    ['switch', 'Switch', '开关'],
    ['time-picker', 'Time Picker', '时间选择器'],
    ['time-select', 'Time Select', '时间选择'],
    ['transfer', 'Transfer', '穿梭框'],
    ['tree-select', 'Tree Select', '树形选择'],
    ['upload', 'Upload', '上传'],
  ]),
  ...group('Data', [
    ['avatar', 'Avatar', '头像'],
    ['badge', 'Badge', '徽章'],
    ['calendar', 'Calendar', '日历'],
    ['card', 'Card', '卡片'],
    ['carousel', 'Carousel', '走马灯'],
    ['collapse', 'Collapse', '折叠面板'],
    ['descriptions', 'Descriptions', '描述列表'],
    ['empty', 'Empty', '空状态'],
    ['image', 'Image', '图片'],
    ['infinite-scroll', 'Infinite Scroll', '无限滚动'],
    ['pagination', 'Pagination', '分页'],
    ['progress', 'Progress', '进度条'],
    ['result', 'Result', '结果'],
    ['skeleton', 'Skeleton', '骨架屏'],
    ['table', 'Table', '表格'],
    ['virtualized-table', 'Virtualized Table', '虚拟化表格', 'table-v2'],
    ['tag', 'Tag', '标签'],
    ['timeline', 'Timeline', '时间线'],
    ['tour', 'Tour', '漫游引导'],
    ['tree', 'Tree', '树形控件'],
    ['virtualized-tree', 'Virtualized Tree', '虚拟化树', 'tree-v2'],
    ['statistic', 'Statistic', '统计数值'],
    ['segmented', 'Segmented', '分段选择器'],
  ]),
  ...group('Navigation', [
    ['affix', 'Affix', '固钉'],
    ['anchor', 'Anchor', '锚点'],
    ['backtop', 'Backtop', '回到顶部'],
    ['breadcrumb', 'Breadcrumb', '面包屑'],
    ['dropdown', 'Dropdown', '下拉菜单'],
    ['menu', 'Menu', '菜单'],
    ['page-header', 'Page Header', '页头'],
    ['steps', 'Steps', '步骤条'],
    ['tabs', 'Tabs', '标签页'],
  ]),
  ...group('Feedback', [
    ['alert', 'Alert', '提示'],
    ['dialog', 'Dialog', '对话框'],
    ['drawer', 'Drawer', '抽屉'],
    ['loading', 'Loading', '加载'],
    ['message', 'Message', '消息提示'],
    ['message-box', 'Message Box', '消息弹框'],
    ['notification', 'Notification', '通知'],
    ['popconfirm', 'Popconfirm', '气泡确认框'],
    ['popover', 'Popover', '气泡卡片'],
    ['tooltip', 'Tooltip', '文字提示'],
  ]),
  ...group('Others', [
    ['divider', 'Divider', '分割线'],
    ['watermark', 'Watermark', '水印'],
  ]),
] as const satisfies readonly VueCatalogEntry[]

export const vueCategories: readonly VueCatalogCategory[] = [
  'Basic',
  'Configuration',
  'Form',
  'Data',
  'Navigation',
  'Feedback',
  'Others',
]

export const vueCatalogBySlug = new Map(vueCatalog.map((entry) => [entry.slug, entry]))

export function catalogByCategory(category: VueCatalogCategory): readonly VueCatalogEntry[] {
  return vueCatalog.filter((entry) => entry.category === category)
}
