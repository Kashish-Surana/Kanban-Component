"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { KanbanColumn } from "@/components/kanban/Column"
import { DragDropContext } from "@hello-pangea/dnd"
import type { Column } from "@/lib/types"

const meta = {
  title: "Kanban/Column",
  component: KanbanColumn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DragDropContext onDragEnd={() => {}}>
        <div className="h-[600px]">
          <Story />
        </div>
      </DragDropContext>
    ),
  ],
} satisfies Meta<typeof KanbanColumn>

export default meta
type Story = StoryObj<typeof meta>

const emptyColumn: Column = {
  id: "todo",
  title: "To Do",
  icon: "📋",
  tasks: [],
}

const fullColumn: Column = {
  id: "in-progress",
  title: "In Progress",
  icon: "🔄",
  tasks: [
    {
      id: "1",
      title: "Design new landing page",
      description: "Create wireframes and mockups",
      columnId: "in-progress",
      priority: "high",
      tags: ["design", "frontend"],
      createdAt: new Date("2024-01-15"),
      assignee: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: "2",
      title: "Build user dashboard",
      description: "Implement analytics charts",
      columnId: "in-progress",
      priority: "medium",
      tags: ["frontend"],
      createdAt: new Date("2024-01-14"),
    },
    {
      id: "3",
      title: "API integration",
      description: "Connect to external services",
      columnId: "in-progress",
      priority: "high",
      tags: ["backend", "api"],
      createdAt: new Date("2024-01-13"),
      assignee: { name: "Mike Ross", avatar: "/placeholder.svg?height=32&width=32" },
    },
  ],
}

const overloadedColumn: Column = {
  id: "review",
  title: "Review",
  icon: "👀",
  tasks: Array.from({ length: 10 }, (_, i) => ({
    id: `task-${i}`,
    title: `Review task ${i + 1}`,
    description: `This is task number ${i + 1} waiting for review`,
    columnId: "review",
    priority: (["low", "medium", "high", "urgent"] as const)[i % 4],
    tags: ["review"],
    createdAt: new Date(Date.now() - i * 86400000),
  })),
}

export const Empty: Story = {
  args: {
    column: emptyColumn,
    onAddTask: () => {},
    onEditTask: () => {},
    onDeleteTask: () => {},
  },
}

export const WithTasks: Story = {
  args: {
    column: fullColumn,
    onAddTask: () => {},
    onEditTask: () => {},
    onDeleteTask: () => {},
  },
}

export const Overloaded: Story = {
  args: {
    column: overloadedColumn,
    onAddTask: () => {},
    onEditTask: () => {},
    onDeleteTask: () => {},
  },
}
