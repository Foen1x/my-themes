"use client"

import { Bell, MoreHorizontal, Plus, Settings, User } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const rows = [
  { component: "Button", coverage: "12 states", owner: "Core UI", status: "Ready" },
  { component: "Data Table", coverage: "8 states", owner: "Product", status: "Review" },
  { component: "Date Picker", coverage: "10 states", owner: "Forms", status: "Ready" },
]

export function ProductPatterns() {
  const [tab, setTab] = useState("dashboard")
  return <div><header className="page-heading"><h1>Product patterns</h1><p>把基础组件放进实际工作流，检查信息密度、表单节奏、数据状态和响应式导航。</p></header><Tabs value={tab} onValueChange={(value) => setTab(value as string)}><TabsList><TabsTrigger value="dashboard">Dashboard</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger><TabsTrigger value="feedback">Feedback</TabsTrigger></TabsList></Tabs>
    {tab === "dashboard" && <section className="pattern-canvas"><header className="pattern-toolbar"><div><strong>Component operations</strong><span>Workspace health and review queue</span></div><Input placeholder="Search components" /><Button variant="outline" size="icon" aria-label="Notifications"><Bell /></Button><Button><Plus /> New review</Button></header><div className="metric-row"><div><span>Coverage</span><strong>63/63</strong><small>All routes active</small></div><div><span>Open reviews</span><strong>7</strong><small>2 due today</small></div><div><span>Theme checks</span><strong>96%</strong><small>Across 5 palettes</small></div></div><div className="chart-panel"><div className="chart-title"><strong>Review throughput</strong><Button variant="ghost" size="icon-sm" aria-label="Chart actions"><MoreHorizontal /></Button></div><div className="bars">{[35, 48, 43, 70, 56, 81, 65, 88, 72, 91, 78, 96].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div><Table><TableHeader><TableRow><TableHead>Component</TableHead><TableHead>Coverage</TableHead><TableHead>Owner</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.component}><TableCell className="font-medium">{row.component}</TableCell><TableCell>{row.coverage}</TableCell><TableCell>{row.owner}</TableCell><TableCell><Badge variant={row.status === "Ready" ? "secondary" : "outline"}>{row.status}</Badge></TableCell><TableCell><Button variant="ghost" size="icon-sm" aria-label="Row actions"><MoreHorizontal /></Button></TableCell></TableRow>)}</TableBody></Table></section>}
    {tab === "settings" && <section className="pattern-canvas settings-pattern"><aside><button className="active"><User /> Profile</button><button><Bell /> Notifications</button><button><Settings /> Appearance</button></aside><form><h2>Workspace settings</h2><p>Manage the identity and review defaults used by the theme catalog.</p><FieldGroup><div className="field-grid"><Field><FieldLabel>Workspace name</FieldLabel><Input defaultValue="Theme Lab" /></Field><Field><FieldLabel>Default framework</FieldLabel><Select defaultValue="react"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="react">React</SelectItem><SelectItem value="vue">Vue</SelectItem></SelectContent></Select></Field></div><Field><FieldLabel>Review notes</FieldLabel><Textarea rows={4} defaultValue="Check contrast, keyboard focus, and compact layouts." /></Field><Field orientation="horizontal"><div className="flex-1"><FieldLabel>Email review summary</FieldLabel><FieldDescription>Receive one digest after catalog checks complete.</FieldDescription></div><Switch defaultChecked /></Field><Button className="w-fit">Save changes</Button></FieldGroup></form></section>}
    {tab === "feedback" && <section className="pattern-canvas feedback-pattern"><div className="result-panel"><span>✓</span><h2>Catalog check complete</h2><p>63 component routes and five semantic themes passed validation.</p><div><Button>View report</Button><Button variant="outline">Run again</Button></div></div><div className="feedback-list"><Alert><AlertTitle>No missing previews</AlertTitle><AlertDescription>All routes have meaningful content.</AlertDescription></Alert><Alert><AlertTitle>Contrast review</AlertTitle><AlertDescription>Two pairs are close to the threshold.</AlertDescription></Alert><Progress value={96}><ProgressLabel>Overall quality</ProgressLabel><ProgressValue /></Progress></div></section>}
  </div>
}
