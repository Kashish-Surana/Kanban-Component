"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { KanbanTask } from "@/components/KanbanBoard/KanbanTask"
import type { Task } from "@/lib/types"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"

const meta = {
  title: "Components/KanbanTask",
  component: KanbanTask,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="story">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="w-80">
              <Story />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    ),
  ],
} satisfies Meta<typeof KanbanTask>

export default meta
type Story = StoryObj<typeof meta>

const sampleTask: Task = {
  id: "1",
  title: "Design new landing page",
  description: "Create wireframes and mockups for the new marketing site",
  columnId: "todo",
}

const shortTask: Task = {
  id: "2",
  title: "Quick bug fix",
  description: "",
  columnId: "in-progress",
}

const longTask: Task = {
  id: "3",
  title: "Complex feature implementation with a very long title that spans multiple lines",
  description:
    "This is a detailed description that explains the full scope of work required for this complex feature. It includes multiple requirements, technical specifications, and implementation details that need to be carefully considered during development.",
  columnId: "review",
}

export const Default: Story = {
  args: {
    task: sampleTask,
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}

export const WithoutDescription: Story = {
  args: {
    task: shortTask,
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}

export const LongContent: Story = {
  args: {
    task: longTask,
    index: 0,
    onEdit: () => {},
    onDelete: () => {},
  },
}
