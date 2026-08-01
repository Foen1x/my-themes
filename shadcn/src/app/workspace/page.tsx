import type { Metadata } from "next"
import { AiWorkspace } from "@/components/ai-workspace"
import "./workspace.css"

export const metadata: Metadata = {
  title: "AI Workspace · Theme Lab",
  description: "AI 原生企业级协同工作台:文档、任务与人的多智能体协作。",
}

export default function WorkspacePage() {
  return <AiWorkspace />
}
