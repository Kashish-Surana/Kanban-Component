"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { KanbanColumn } from "@/components/KanbanBoard/KanbanColumn"
import type { Column } from "@/lib/types"
import { DragDropContext } from "@hello-pangea/dnd"

const meta = {
  title: "Components/KanbanColumn",
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
  tasks: [],
}

const columnWithTasks: Column = {
  id: "in-progress",
  title: "In Progress",
  tasks: [
    {
      id: "1",
      title: "Build user dashboard",
      description: "Implement analytics charts and data visualization",
      columnId: "in-progress",
    },
    {
      id: "2",
      title: "Optimize database queries",
      description: "Add indexes and refactor slow queries",
      columnId: "in-progress",
    },
    {
      id: "3",
      title: "Implement search feature",
      description: "Add full-text search with filters",
      columnId: "in-progress",
    },
  ],
}

const fullColumn: Column = {
  id: "review",
  title: "Review",
  tasks: Array.from({ length: 10 }, (_, i) => ({
    id: `task-${i}`,
    title: `Task ${i + 1}`,
    description: `Description for task ${i + 1}`,
    columnId: "review",
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
    column: columnWithTasks,
    onAddTask: () => {},
    onEditTask: () => {},
    onDeleteTask: () => {},
  },
}

export const FullColumn: Story = {
  args: {
    column: fullColumn,
    onAddTask: () => {},
    onEditTask: () => {},
    onDeleteTask: () => {},
  },
}
