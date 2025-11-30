"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { TaskCard } from "@/components/kanban/TaskCard"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"

const meta = {
  title: "Kanban/TaskCard",
  component: TaskCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="story">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="w-[320px]">
              <Story />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    ),
  ],
} satisfies Meta<typeof TaskCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    task: {
      id: "1",
      title: "Design new landing page",
      description: "Create wireframes and mockups for the new marketing site",
      columnId: "todo",
      priority: "medium",
      tags: ["design", "frontend"],
      createdAt: new Date("2024-01-15"),
    },
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}

export const HighPriority: Story = {
  args: {
    task: {
      id: "2",
      title: "Fix critical security vulnerability",
      description: "Immediate patch required for authentication bypass",
      columnId: "todo",
      priority: "urgent",
      tags: ["security", "critical"],
      createdAt: new Date("2024-01-16"),
      assignee: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
    },
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}

export const LowPriority: Story = {
  args: {
    task: {
      id: "3",
      title: "Update documentation",
      description: "Add examples to the API reference",
      columnId: "todo",
      priority: "low",
      tags: ["docs"],
      createdAt: new Date("2024-01-10"),
    },
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}

export const WithAssignee: Story = {
  args: {
    task: {
      id: "4",
      title: "Build user dashboard",
      description: "Implement analytics charts and data visualization",
      columnId: "in-progress",
      priority: "high",
      tags: ["frontend", "dashboard", "analytics"],
      createdAt: new Date("2024-01-12"),
      assignee: { name: "Alex Kim", avatar: "/placeholder.svg?height=32&width=32" },
    },
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}

export const ManyTags: Story = {
  args: {
    task: {
      id: "5",
      title: "Refactor authentication module",
      description: "Modernize the auth system with new security features",
      columnId: "review",
      priority: "high",
      tags: ["backend", "security", "refactoring", "authentication", "testing"],
      createdAt: new Date("2024-01-14"),
      assignee: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    },
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}

export const NoDescription: Story = {
  args: {
    task: {
      id: "6",
      title: "Quick bug fix",
      description: "",
      columnId: "done",
      priority: "low",
      tags: ["bugfix"],
      createdAt: new Date("2024-01-08"),
    },
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}
