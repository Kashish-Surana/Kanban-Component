"use client"

import { Board } from "@/components/kanban/Board"
import { Sidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"
import type { Column } from "@/lib/types"

const sampleData: Column[] = [
  {
    id: "todo",
    title: "To Do",
    icon: "📋",
    tasks: [
      {
        id: "1",
        title: "Design new landing page",
        description: "Create wireframes and mockups for the new marketing site",
        columnId: "todo",
        priority: "high",
        tags: ["design", "frontend"],
        createdAt: new Date("2024-01-15"),
        assignee: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
      },
      {
        id: "2",
        title: "Review API documentation",
        description: "Update docs for the new authentication endpoints",
        columnId: "todo",
        priority: "medium",
        tags: ["docs", "backend"],
        createdAt: new Date("2024-01-16"),
      },
      {
        id: "6",
        title: "Security audit",
        description: "Perform security review of authentication system",
        columnId: "todo",
        priority: "urgent",
        tags: ["security", "backend"],
        createdAt: new Date("2024-01-10"),
        assignee: { name: "Mike Ross", avatar: "/placeholder.svg?height=32&width=32" },
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: "🔄",
    tasks: [
      {
        id: "3",
        title: "Build user dashboard",
        description: "Implement analytics charts and data visualization",
        columnId: "in-progress",
        priority: "high",
        tags: ["frontend", "dashboard"],
        createdAt: new Date("2024-01-12"),
        assignee: { name: "Alex Kim", avatar: "/placeholder.svg?height=32&width=32" },
      },
      {
        id: "7",
        title: "Optimize database queries",
        description: "Improve performance of slow queries in production",
        columnId: "in-progress",
        priority: "medium",
        tags: ["backend", "performance"],
        createdAt: new Date("2024-01-14"),
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    icon: "👀",
    tasks: [
      {
        id: "4",
        title: "Code review for auth module",
        description: "Review PR #234 for security best practices",
        columnId: "review",
        priority: "high",
        tags: ["security", "review"],
        createdAt: new Date("2024-01-11"),
        assignee: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    icon: "✅",
    tasks: [
      {
        id: "5",
        title: "Setup CI/CD pipeline",
        description: "Configured GitHub Actions for automated deployments",
        columnId: "done",
        priority: "low",
        tags: ["devops", "automation"],
        createdAt: new Date("2024-01-08"),
        assignee: { name: "John Smith", avatar: "/placeholder.svg?height=32&width=32" },
      },
    ],
  },
]

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full">
            <Board initialColumns={sampleData} />
          </div>
        </main>
      </div>
    </div>
  )
}
