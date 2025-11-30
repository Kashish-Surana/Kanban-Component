import type { Meta, StoryObj } from "@storybook/react"
import { Board } from "@/components/kanban/Board"
import type { Column } from "@/lib/types"

const meta = {
  title: "Kanban/Board/BoardComponent",
  component: Board,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen p-6 bg-background">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Board>

export default meta
type Story = StoryObj<typeof meta>

const sampleColumns: Column[] = [
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
        priority: "urgent",
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

export const DefaultBoard: Story = {
  args: {
    initialColumns: sampleColumns,
  },
}

export const EmptyBoard: Story = {
  args: {
    initialColumns: [
      { id: "todo", title: "To Do", icon: "📋", tasks: [] },
      { id: "in-progress", title: "In Progress", icon: "🔄", tasks: [] },
      { id: "review", title: "Review", icon: "👀", tasks: [] },
      { id: "done", title: "Done", icon: "✅", tasks: [] },
    ],
  },
}

export const FullBoardBoard: Story = {
  args: {
    initialColumns: [
      {
        id: "todo",
        title: "To Do",
        icon: "📋",
        tasks: Array.from({ length: 5 }, (_, i) => ({
          id: `todo-${i}`,
          title: `Todo task ${i + 1}`,
          description: `Description for todo task ${i + 1}`,
          columnId: "todo",
          priority: (["low", "medium", "high", "urgent"] as const)[i % 4],
          tags: ["backend", "frontend"][i % 2] === "backend" ? ["backend"] : ["frontend"],
          createdAt: new Date(Date.now() - i * 86400000),
        })),
      },
      {
        id: "in-progress",
        title: "In Progress",
        icon: "🔄",
        tasks: Array.from({ length: 4 }, (_, i) => ({
          id: `progress-${i}`,
          title: `In progress task ${i + 1}`,
          description: `Description for in progress task ${i + 1}`,
          columnId: "in-progress",
          priority: (["low", "medium", "high", "urgent"] as const)[i % 4],
          tags: ["development"],
          createdAt: new Date(Date.now() - i * 86400000),
          assignee: { name: `Dev ${i + 1}`, avatar: "/placeholder.svg?height=32&width=32" },
        })),
      },
      {
        id: "review",
        title: "Review",
        icon: "👀",
        tasks: Array.from({ length: 3 }, (_, i) => ({
          id: `review-${i}`,
          title: `Review task ${i + 1}`,
          description: `Description for review task ${i + 1}`,
          columnId: "review",
          priority: "high",
          tags: ["review", "testing"],
          createdAt: new Date(Date.now() - i * 86400000),
        })),
      },
      {
        id: "done",
        title: "Done",
        icon: "✅",
        tasks: Array.from({ length: 6 }, (_, i) => ({
          id: `done-${i}`,
          title: `Completed task ${i + 1}`,
          description: `Description for completed task ${i + 1}`,
          columnId: "done",
          priority: "low",
          tags: ["completed"],
          createdAt: new Date(Date.now() - (i + 7) * 86400000),
        })),
      },
    ],
  },
}
