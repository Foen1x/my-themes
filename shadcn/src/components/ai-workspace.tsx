"use client"

import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleCheck,
  Clock,
  Eye,
  FileText,
  Flag,
  ListChecks,
  MessageSquare,
  PenLine,
  Plus,
  Radio,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import { type CSSProperties, type FormEvent, useState } from "react"

/* ------------------------------------------------------------------ */
/* 数据                                                                */
/* ------------------------------------------------------------------ */

const people = {
  lin: { name: "林岚", hue: 265 },
  chen: { name: "陈默", hue: 340 },
  su: { name: "苏黎", hue: 210 },
  gao: { name: "高翔", hue: 160 },
  he: { name: "何苗", hue: 25 },
  zhou: { name: "周琪", hue: 300 },
} as const

type PersonKey = keyof typeof people

type Owner = { kind: "human"; person: PersonKey } | { kind: "ai"; name: string }

type ColumnId = "backlog" | "progress" | "review" | "done"

interface TaskCard {
  id: string
  column: ColumnId
  tag: string
  tagHue: number
  title: string
  progress: number
  owners: Owner[]
  due?: string
  comments?: number
  aiNote?: string
  drafting?: string
}

const columns: readonly { id: ColumnId; label: string; en: string; tone: string }[] = [
  { id: "backlog", label: "待规划", en: "Backlog", tone: "muted" },
  { id: "progress", label: "进行中", en: "In Progress", tone: "info" },
  { id: "review", label: "AI 评审", en: "AI Review", tone: "gold" },
  { id: "done", label: "已完成", en: "Done", tone: "success" },
]

const tasks: readonly TaskCard[] = [
  { id: "NX-131", column: "backlog", tag: "文档", tagHue: 265, title: "多语言工作台文案梳理", progress: 0, owners: [{ kind: "human", person: "he" }], due: "08-14", comments: 2 },
  { id: "NX-129", column: "backlog", tag: "架构", tagHue: 210, title: "权限模型 v2 评审", progress: 0, owners: [{ kind: "human", person: "gao" }], due: "08-15" },
  { id: "NX-126", column: "backlog", tag: "数据", tagHue: 25, title: "新人引导流程埋点方案", progress: 0, owners: [{ kind: "human", person: "zhou" }], comments: 5 },
  { id: "NX-122", column: "progress", tag: "前端", tagHue: 160, title: "AI 摘要侧边栏联调", progress: 62, owners: [{ kind: "human", person: "su" }, { kind: "ai", name: "Nexus" }], due: "08-06", comments: 8, drafting: "Nexus AI 正在起草联调说明…" },
  { id: "NX-118", column: "progress", tag: "设计", tagHue: 340, title: "发布页视觉走查", progress: 45, owners: [{ kind: "human", person: "chen" }], due: "08-05", comments: 3 },
  { id: "NX-115", column: "progress", tag: "性能", tagHue: 25, title: "搜索延迟优化", progress: 78, owners: [{ kind: "human", person: "gao" }], due: "08-07", comments: 11 },
  { id: "NX-110", column: "review", tag: "OKR", tagHue: 300, title: "Q3 OKR 对齐纪要", progress: 90, owners: [{ kind: "human", person: "lin" }, { kind: "ai", name: "Scribe" }], comments: 6, aiNote: "2 条评审意见待确认" },
  { id: "NX-108", column: "review", tag: "文案", tagHue: 330, title: "企业版定价页文案", progress: 100, owners: [{ kind: "ai", name: "Scribe" }, { kind: "human", person: "lin" }], due: "08-04", aiNote: "AI 初稿完成,待人工签发" },
  { id: "NX-101", column: "done", tag: "设计", tagHue: 340, title: "设计令牌迁移", progress: 100, owners: [{ kind: "human", person: "chen" }], comments: 4 },
  { id: "NX-097", column: "done", tag: "前端", tagHue: 160, title: "移动端导航重构", progress: 100, owners: [{ kind: "human", person: "su" }], comments: 9 },
  { id: "NX-094", column: "done", tag: "自动化", tagHue: 200, title: "周报复盘自动生成", progress: 100, owners: [{ kind: "ai", name: "Pulse" }] },
]

const agents = [
  { name: "Scribe", role: "文档 Agent", state: "撰写中", tone: "info", desc: "正在为「Q3 OKR 对齐纪要」补充 5 项行动项", progress: 68 },
  { name: "Pulse", role: "进度 Agent", state: "跟踪中", tone: "success", desc: "已同步 14 个任务状态 · 每 30 秒巡检", progress: null },
  { name: "Sentinel", role: "风险 Agent", state: "1 条预警", tone: "warning", desc: "「搜索延迟优化」存在 1 天延期风险", progress: null },
] as const

const feed = [
  { icon: "ai", actor: "Scribe", action: "生成了「企业版定价页文案」初稿,共 1,204 字", time: "2 分钟前", tone: "primary" },
  { icon: "human", person: "su" as PersonKey, action: "完成了「移动端导航重构」并提交走查", time: "9 分钟前", tone: "success" },
  { icon: "ai", actor: "Nexus AI", action: "将 3 个任务移入 AI 评审列", time: "26 分钟前", tone: "gold" },
  { icon: "human", person: "lin" as PersonKey, action: "评论了「Q3 OKR 对齐纪要」:行动项已确认", time: "41 分钟前", tone: "info" },
  { icon: "ai", actor: "Sentinel", action: "标记「搜索延迟优化」为潜在延期风险", time: "1 小时前", tone: "warning" },
  { icon: "human", person: "chen" as PersonKey, action: "上传了 4 张发布页视觉稿", time: "2 小时前", tone: "muted" },
] as const

const docs = [
  { title: "Q3 OKR 对齐纪要", status: "review", statusLabel: "评审中", hue: 300, summary: "AI 摘要:3 个目标 · 7 项关键结果 · 2 个风险点", owners: [{ kind: "human", person: "lin" }, { kind: "ai", name: "Scribe" }] as Owner[], words: "2,408 字", updated: "10 分钟前", fresh: 86, live: true },
  { title: "企业版定价页文案", status: "draft", statusLabel: "草稿", hue: 330, summary: "", owners: [{ kind: "ai", name: "Scribe" }] as Owner[], words: "1,204 字", updated: "2 分钟前", fresh: 34, live: false, summarizing: true },
  { title: "星轨计划 PRD v3.2", status: "published", statusLabel: "已发布", hue: 210, summary: "AI 摘要:覆盖 5 个模块 · 22 条验收标准", owners: [{ kind: "human", person: "lin" }, { kind: "human", person: "gao" }] as Owner[], words: "8,912 字", updated: "昨天", fresh: 100, live: false },
  { title: "发布检查清单 Launch Checklist", status: "scheduled", statusLabel: "已排期", hue: 160, summary: "AI 摘要:17 项检查 · 4 项已预检通过", owners: [{ kind: "human", person: "gao" }, { kind: "ai", name: "Sentinel" }] as Owner[], words: "640 字", updated: "3 小时前", fresh: 64, live: false },
] as const

const milestones = [
  { label: "M1 需求冻结", date: "07-18", state: "done" },
  { label: "M2 视觉定稿", date: "07-30", state: "done" },
  { label: "M3 灰度发布", date: "08-08", state: "current" },
  { label: "M4 全量发布", date: "08-22", state: "next" },
] as const

const velocity = [
  { h: 34, ai: 22 }, { h: 46, ai: 30 }, { h: 42, ai: 26 }, { h: 58, ai: 38 },
  { h: 52, ai: 36 }, { h: 70, ai: 46 }, { h: 64, ai: 44 }, { h: 80, ai: 56 },
  { h: 72, ai: 50 }, { h: 88, ai: 62 }, { h: 84, ai: 60 }, { h: 96, ai: 70 },
]

const metrics = [
  { label: "进行中任务", value: "24", delta: "+6 本周", tone: "primary", icon: ListChecks },
  { label: "AI 本周交付", value: "137 项", delta: "↑ 42%", tone: "gold", icon: Bot },
  { label: "平均交付周期", value: "3.2 天", delta: "-38%", tone: "info", icon: Zap },
  { label: "里程碑准时率", value: "94%", delta: "近 6 个月", tone: "success", icon: Target },
] as const

const promptChips = ["为定价页生成 3 版文案", "拆解「搜索优化」为子任务", "汇总本周进度周报", "预测 Q3 里程碑风险"]

const presencePeople: PersonKey[] = ["lin", "chen", "su", "gao", "he"]

/* ------------------------------------------------------------------ */
/* 小组件                                                              */
/* ------------------------------------------------------------------ */

function PersonAvatar({ person, size = 24 }: { person: PersonKey; size?: number }) {
  const p = people[person]
  return (
    <span className="ai-avatar" style={{ "--h": p.hue, width: size, height: size, fontSize: size * 0.42 } as CSSProperties} title={p.name}>
      {p.name.slice(0, 1)}
    </span>
  )
}

function AgentAvatar({ size = 24 }: { size?: number }) {
  return (
    <span className="ai-avatar ai-avatar-bot" style={{ width: size, height: size }} title="AI Agent">
      <Bot style={{ width: size * 0.58, height: size * 0.58 }} />
    </span>
  )
}

function OwnerStack({ owners, size = 22 }: { owners: readonly Owner[]; size?: number }) {
  return (
    <span className="ai-stack">
      {owners.map((owner, index) =>
        owner.kind === "human" ? (
          <PersonAvatar key={`${owner.person}-${index}`} person={owner.person} size={size} />
        ) : (
          <AgentAvatar key={`${owner.name}-${index}`} size={size} />
        ),
      )}
    </span>
  )
}

function rise(delay: number): CSSProperties {
  return { "--d": `${delay}ms` } as CSSProperties
}

/* ------------------------------------------------------------------ */
/* 主组件                                                              */
/* ------------------------------------------------------------------ */

export function AiWorkspace() {
  const [prompt, setPrompt] = useState("")
  const [thinking, setThinking] = useState(false)
  const [proposals, setProposals] = useState(0)
  const [accepted, setAccepted] = useState(0)
  const [filter, setFilter] = useState<"all" | "human" | "ai">("all")

  const submitPrompt = (event: FormEvent) => {
    event.preventDefault()
    if (!prompt.trim() || thinking) return
    setPrompt("")
    setThinking(true)
    window.setTimeout(() => {
      setThinking(false)
      setProposals((count) => Math.min(count + 1, 2))
    }, 1500)
  }

  const visibleTasks = tasks.filter((task) => filter === "all" || task.owners.some((owner) => owner.kind === filter))
  const countFor = (kind: "all" | "human" | "ai") => (kind === "all" ? tasks.length : tasks.filter((task) => task.owners.some((owner) => owner.kind === kind)).length)

  return (
    <div className="ai-workspace">
      <div className="ai-ambient" aria-hidden="true">
        <i className="ai-blob ai-blob-a" />
        <i className="ai-blob ai-blob-b" />
        <i className="ai-blob ai-blob-c" />
      </div>

      {/* ---------- Hero ---------- */}
      <header className="ai-hero">
        <div className="ai-hero-copy ai-rise" style={rise(0)}>
          <span className="ai-eyebrow"><Sparkles /> AI NATIVE WORKSPACE · 星轨计划 Q3</span>
          <h1>团队与 AI,<br />在<span className="ai-grad">同一个节奏</span>里工作。</h1>
          <p>文档、任务、评审与发布全部汇入同一幅工作图景。AI Agent 与成员并肩写作、主动推进、持续跟踪,人只需做真正的决定。</p>
          <div className="ai-presence">
            <span className="ai-stack ai-stack-lg">
              {presencePeople.map((person) => <PersonAvatar key={person} person={person} size={30} />)}
              <AgentAvatar size={30} />
            </span>
            <span className="ai-live"><i /> 12 位协作者在线</span>
            <span className="ai-presence-sep" />
            <span className="ai-presence-agents"><Bot /> 3 个 AI Agent 运行中</span>
          </div>
        </div>

        <div className="ai-console ai-rise" style={rise(140)}>
          <div className="ai-console-head">
            <span className="ai-console-orb"><Sparkles /></span>
            <div><strong>Nexus AI 指挥舱</strong><small>Orchestrating 3 agents · 14 tasks</small></div>
            <span className="ai-console-badge"><Radio /> LIVE</span>
          </div>
          <div className="ai-console-body">
            <p>已同步 14 个任务状态。检测到 <b>1 项延期风险</b>:「搜索延迟优化」排期偏紧,建议拆分为两个阶段。</p>
            <p className="ai-console-stream">需要我创建子任务并通知高翔吗?<i className="ai-caret" /></p>
            <div className="ai-console-actions">
              <button type="button" className="ai-btn ai-btn-primary"><Plus /> 创建子任务</button>
              <button type="button" className="ai-btn"><Eye /> 查看风险</button>
            </div>
          </div>
          <div className="ai-console-foot">
            <span><PenLine /> 起草</span><span><ListChecks /> 拆解</span><span><TrendingUp /> 跟进</span><span><Flag /> 预警</span>
          </div>
        </div>
      </header>

      {/* ---------- 指令条 ---------- */}
      <section className="ai-command ai-rise" style={rise(240)}>
        <form className="ai-command-frame" onSubmit={submitPrompt}>
          <div className="ai-command-inner">
            <Sparkles className="ai-command-icon" />
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="描述目标,Nexus AI 将拆解任务、起草文档、跟进进度…"
              aria-label="AI 指令输入"
            />
            <kbd>⌘K</kbd>
            <button type="submit" className="ai-command-send" aria-label="发送指令"><Send /></button>
          </div>
        </form>
        <div className="ai-command-chips">
          {promptChips.map((chip) => <button key={chip} type="button" onClick={() => setPrompt(chip)}>{chip}</button>)}
        </div>
        {thinking && (
          <div className="ai-thinking">
            <span className="ai-dots"><i /><i /><i /></span> Nexus AI 正在理解目标并检索工作区上下文…
          </div>
        )}
        {Array.from({ length: proposals }, (_, index) => (
          <div key={index} className="ai-proposal">
            <div className="ai-proposal-head">
              <span className="ai-console-orb ai-console-orb-sm"><Sparkles /></span>
              <strong>{accepted > index ? "已创建 3 个任务并指派给 Scribe" : "已生成 3 项任务提案"}</strong>
              <small>基于「{promptChips[index % promptChips.length]}」</small>
            </div>
            <ul>
              <li><CircleCheck /> 拆分「搜索延迟优化」为索引重构 / 缓存预热两阶段</li>
              <li><CircleCheck /> 起草发布页多语言文案初稿(中 / 英 / 日)</li>
              <li><CircleCheck /> 生成灰度发布检查清单并预检 4 项</li>
            </ul>
            {accepted > index ? (
              <span className="ai-proposal-done"><CheckCircle2 /> 已同步到看板 · 评审列</span>
            ) : (
              <div className="ai-proposal-actions">
                <button type="button" className="ai-btn ai-btn-primary" onClick={() => setAccepted((value) => Math.max(value, index + 1))}><CheckCircle2 /> 全部采纳</button>
                <button type="button" className="ai-btn">逐条确认 <ChevronRight /></button>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ---------- 指标 ---------- */}
      <section className="ai-metrics">
        {metrics.map((metric, index) => (
          <div key={metric.label} className={`ai-metric ai-rise ai-tone-${metric.tone}`} style={rise(320 + index * 70)}>
            <span className="ai-metric-icon"><metric.icon /></span>
            <span className="ai-metric-label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <em>{metric.delta}</em>
          </div>
        ))}
      </section>

      {/* ---------- 看板 + 侧栏 ---------- */}
      <section className="ai-grid">
        <div className="ai-board ai-rise" style={rise(520)}>
          <div className="ai-board-head">
            <div className="ai-board-title">
              <strong>星轨计划 · 任务看板</strong>
              <small>人与 AI 混合排期 · 实时同步</small>
            </div>
            <div className="ai-board-tabs" role="tablist" aria-label="任务过滤">
              {([["all", "全部"], ["human", "人类负责"], ["ai", "AI 负责"]] as const).map(([kind, label]) => (
                <button key={kind} type="button" role="tab" aria-selected={filter === kind} className={filter === kind ? "active" : ""} onClick={() => setFilter(kind)}>
                  {label}<span>{countFor(kind)}</span>
                </button>
              ))}
            </div>
            <button type="button" className="ai-btn ai-btn-ghost"><Plus /> 新建</button>
          </div>
          <div className="ai-board-cols">
            {columns.map((column) => {
              const columnTasks = visibleTasks.filter((task) => task.column === column.id)
              return (
                <div key={column.id} className="ai-col">
                  <div className={`ai-col-head ai-tone-${column.tone}`}>
                    <i /><strong>{column.label}</strong><small>{column.en}</small><span>{columnTasks.length}</span>
                  </div>
                  <div className="ai-col-body">
                    {columnTasks.map((task) => (
                      <article key={task.id} className="ai-card">
                        <div className="ai-card-top">
                          <span className="ai-tag" style={{ "--h": task.tagHue } as CSSProperties}>{task.tag}</span>
                          <span className="ai-card-id">{task.id}</span>
                        </div>
                        <h4>{task.title}</h4>
                        {task.aiNote && <div className="ai-note"><Sparkles /> {task.aiNote}</div>}
                        {task.drafting && (
                          <div className="ai-drafting">
                            <span className="ai-dots"><i /><i /><i /></span> {task.drafting}
                            <b className="ai-shimmer-line" /><b className="ai-shimmer-line ai-shimmer-short" />
                          </div>
                        )}
                        {task.column !== "done" && !task.drafting && (
                          <div className="ai-progress"><i style={{ "--w": `${task.progress}%` } as CSSProperties} /></div>
                        )}
                        <div className="ai-card-foot">
                          <OwnerStack owners={task.owners} />
                          <span className="ai-card-meta">
                            {task.comments && <i><MessageSquare /> {task.comments}</i>}
                            {task.due && task.column !== "done" && <i><Clock /> {task.due}</i>}
                            {task.column === "done" && <i className="ai-done-mark"><CheckCircle2 /> 已交付</i>}
                          </span>
                        </div>
                      </article>
                    ))}
                    {columnTasks.length === 0 && <div className="ai-col-empty">该过滤条件下暂无任务</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <aside className="ai-side">
          <div className="ai-agents ai-rise" style={rise(600)}>
            <div className="ai-panel-head"><strong>AI Agent 值班室</strong><span className="ai-live ai-live-sm"><i /> 3 运行中</span></div>
            {agents.map((agent) => (
              <div key={agent.name} className={`ai-agent ai-tone-${agent.tone}`}>
                <AgentAvatar size={34} />
                <div className="ai-agent-main">
                  <div className="ai-agent-title"><strong>{agent.name}</strong><small>{agent.role}</small><em><i className="ai-state-dot" />{agent.state}</em></div>
                  <p>{agent.desc}</p>
                  {agent.progress !== null && <div className="ai-progress ai-progress-sm"><i style={{ "--w": `${agent.progress}%` } as CSSProperties} /></div>}
                </div>
              </div>
            ))}
          </div>

          <div className="ai-feed ai-rise" style={rise(680)}>
            <div className="ai-panel-head"><strong>实时动态</strong><span className="ai-live ai-live-sm"><i /> LIVE</span></div>
            <ol>
              {feed.map((item, index) => (
                <li key={index} className={`ai-rise ai-tone-${item.tone}`} style={rise(720 + index * 90)}>
                  {item.icon === "ai" ? <AgentAvatar size={26} /> : <PersonAvatar person={(item as { person: PersonKey }).person} size={26} />}
                  <div>
                    <p><b>{item.icon === "ai" ? (item as { actor: string }).actor : people[(item as { person: PersonKey }).person].name}</b> {item.action}</p>
                    <small>{item.time}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>

      {/* ---------- 文档 ---------- */}
      <section className="ai-docs ai-rise" style={rise(120)}>
        <div className="ai-panel-head ai-docs-head">
          <div><strong>团队文档</strong><small>AI 摘要 · 多人同写 · 状态流转</small></div>
          <button type="button" className="ai-btn ai-btn-ghost">全部文档 <ArrowUpRight /></button>
        </div>
        <div className="ai-doc-list">
          {docs.map((doc) => (
            <article key={doc.title} className="ai-doc">
              <span className="ai-doc-icon" style={{ "--h": doc.hue } as CSSProperties}><FileText /></span>
              <div className="ai-doc-main">
                <div className="ai-doc-title">
                  <h4>{doc.title}</h4>
                  <span className={`ai-chip ai-chip-${doc.status}`}>{doc.statusLabel}</span>
                  {doc.live && <span className="ai-chip ai-chip-live"><i /> 2 人正在编辑</span>}
                </div>
                {"summarizing" in doc && doc.summarizing ? (
                  <div className="ai-doc-summarizing"><Sparkles /> AI 正在总结 <b className="ai-shimmer-line" /></div>
                ) : (
                  <p className="ai-doc-summary"><Sparkles /> {doc.summary}</p>
                )}
                <div className="ai-doc-meta">
                  <OwnerStack owners={doc.owners} size={20} />
                  <span>{doc.words}</span><span>更新于 {doc.updated}</span>
                  <span className="ai-fresh"><i style={{ "--w": `${doc.fresh}%` } as CSSProperties} /> 完成度 {doc.fresh}%</span>
                </div>
              </div>
              {doc.live && (
                <div className="ai-cursors" aria-hidden="true">
                  <span className="ai-cursor ai-cursor-a"><i />林岚</span>
                  <span className="ai-cursor ai-cursor-b"><i />Scribe AI</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ---------- 跟踪 ---------- */}
      <section className="ai-track">
        <div className="ai-milestones ai-rise" style={rise(160)}>
          <div className="ai-panel-head"><strong>里程碑跟踪</strong><small>Q3 · 4 个节点</small></div>
          <div className="ai-ms-rail"><i /></div>
          <ol className="ai-ms-list">
            {milestones.map((ms) => (
              <li key={ms.label} className={`ai-ms-${ms.state}`}>
                <span className="ai-ms-dot">{ms.state === "done" && <CheckCircle2 />}{ms.state === "current" && <i className="ai-state-pulse" />}</span>
                <div><strong>{ms.label}</strong><small>{ms.date}</small></div>
                {ms.state === "current" && <em>进行中 · 64%</em>}
                {ms.state === "next" && <em>待启动</em>}
              </li>
            ))}
          </ol>
          <div className="ai-ms-note"><CalendarDays /> 灰度发布窗口:08-08 至 08-12 · Nexus AI 将在 T-1 天自动生成发布通告</div>
        </div>

        <div className="ai-velocity ai-rise" style={rise(240)}>
          <div className="ai-panel-head">
            <div><strong>每周交付节奏</strong><small>人工 vs AI 协同产出</small></div>
            <div className="ai-legend"><span className="ai-legend-human"><i /> 人工</span><span className="ai-legend-ai"><i /> AI</span></div>
          </div>
          <div className="ai-chart">
            {velocity.map((bar, index) => (
              <i key={index} style={{ "--h": `${bar.h}%`, "--d": `${index * 45}ms` } as CSSProperties}><b style={{ height: `${bar.ai}%` }} /></i>
            ))}
          </div>
          <div className="ai-risk">
            <span className="ai-risk-icon"><AlertTriangle /></span>
            <div><strong>Sentinel 风险提示</strong><p>「搜索延迟优化」若 08-07 前未完成联调,M3 灰度将顺延 1 天。建议启用 Nexus AI 的自动拆分方案。</p></div>
            <button type="button" className="ai-btn">处理 <ChevronRight /></button>
          </div>
        </div>
      </section>

      <footer className="ai-foot ai-rise" style={rise(300)}>
        <span><Users /> 6 名成员 · 3 个 AI Agent</span>
        <span>Nexus AI 每 30 秒同步一次任务与文档状态 · 数据仅供演示</span>
      </footer>
    </div>
  )
}
