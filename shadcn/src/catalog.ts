export type CatalogCategory =
  | "Foundation"
  | "Forms"
  | "Data Display"
  | "Navigation"
  | "Overlays"
  | "Feedback"
  | "AI"

export interface CatalogEntry {
  slug: string
  name: string
  nameZh: string
  category: CatalogCategory
  description: string
  docsUrl: string
}

type CatalogTuple = readonly [slug: string, name: string, nameZh: string]

function group(category: CatalogCategory, entries: readonly CatalogTuple[]): CatalogEntry[] {
  return entries.map(([slug, name, nameZh]) => ({
    slug,
    name,
    nameZh,
    category,
    description: `${name} 的主题、状态与组合示例。`,
    docsUrl: `https://ui.shadcn.com/docs/components/${slug}`,
  }))
}

export const catalog = [
  ...group("Foundation", [
    ["accordion", "Accordion", "手风琴"],
    ["aspect-ratio", "Aspect Ratio", "宽高比"],
    ["avatar", "Avatar", "头像"],
    ["badge", "Badge", "徽章"],
    ["button", "Button", "按钮"],
    ["button-group", "Button Group", "按钮组"],
    ["card", "Card", "卡片"],
    ["collapsible", "Collapsible", "折叠区域"],
    ["kbd", "Kbd", "键盘按键"],
    ["separator", "Separator", "分隔线"],
    ["typography", "Typography", "排版"],
  ]),
  ...group("Forms", [
    ["checkbox", "Checkbox", "复选框"],
    ["combobox", "Combobox", "组合选择"],
    ["date-picker", "Date Picker", "日期选择"],
    ["field", "Field", "表单字段"],
    ["input", "Input", "输入框"],
    ["input-group", "Input Group", "输入框组"],
    ["input-otp", "Input OTP", "验证码输入"],
    ["label", "Label", "标签"],
    ["native-select", "Native Select", "原生选择"],
    ["radio-group", "Radio Group", "单选组"],
    ["select", "Select", "选择器"],
    ["slider", "Slider", "滑块"],
    ["switch", "Switch", "开关"],
    ["textarea", "Textarea", "多行输入"],
    ["toggle", "Toggle", "切换按钮"],
    ["toggle-group", "Toggle Group", "切换按钮组"],
  ]),
  ...group("Data Display", [
    ["calendar", "Calendar", "日历"],
    ["carousel", "Carousel", "轮播"],
    ["chart", "Chart", "图表"],
    ["data-table", "Data Table", "数据表格"],
    ["empty", "Empty", "空状态"],
    ["item", "Item", "列表项"],
    ["progress", "Progress", "进度"],
    ["resizable", "Resizable", "可调整面板"],
    ["scroll-area", "Scroll Area", "滚动区域"],
    ["skeleton", "Skeleton", "骨架屏"],
    ["spinner", "Spinner", "加载指示"],
    ["table", "Table", "表格"],
  ]),
  ...group("Navigation", [
    ["breadcrumb", "Breadcrumb", "面包屑"],
    ["command", "Command", "命令面板"],
    ["direction", "Direction", "文字方向"],
    ["dropdown-menu", "Dropdown Menu", "下拉菜单"],
    ["menubar", "Menubar", "菜单栏"],
    ["navigation-menu", "Navigation Menu", "导航菜单"],
    ["pagination", "Pagination", "分页"],
    ["sidebar", "Sidebar", "侧边栏"],
    ["tabs", "Tabs", "标签页"],
  ]),
  ...group("Overlays", [
    ["alert-dialog", "Alert Dialog", "警告对话框"],
    ["context-menu", "Context Menu", "上下文菜单"],
    ["dialog", "Dialog", "对话框"],
    ["drawer", "Drawer", "抽屉"],
    ["hover-card", "Hover Card", "悬停卡片"],
    ["popover", "Popover", "气泡面板"],
    ["sheet", "Sheet", "侧滑面板"],
    ["tooltip", "Tooltip", "文字提示"],
  ]),
  ...group("Feedback", [
    ["alert", "Alert", "提示"],
    ["toast", "Toast", "轻提示"],
  ]),
  ...group("AI", [
    ["attachment", "Attachment", "附件"],
    ["bubble", "Bubble", "气泡"],
    ["marker", "Marker", "标记"],
    ["message", "Message", "消息"],
    ["message-scroller", "Message Scroller", "消息滚动区"],
  ]),
] as const satisfies readonly CatalogEntry[]

export const categories: readonly CatalogCategory[] = [
  "Foundation",
  "Forms",
  "Data Display",
  "Navigation",
  "Overlays",
  "Feedback",
  "AI",
]

export const catalogBySlug = new Map(catalog.map((entry) => [entry.slug, entry]))

export function entriesFor(category: CatalogCategory): readonly CatalogEntry[] {
  return catalog.filter((entry) => entry.category === category)
}
