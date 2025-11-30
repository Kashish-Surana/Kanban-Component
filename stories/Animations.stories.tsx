import type { Meta, StoryObj } from "@storybook/react"
import { Board } from "@/components/kanban/Board"
import type { Column } from "@/lib/types"

const meta = {
  title: "Kanban/Animations",
  component: Board,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen p-6 bg-background">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold">Animation Showcase</h2>
          <p className="text-sm text-muted-foreground">Drag cards between columns to see animations</p>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Board>

export default meta
type Story = StoryObj<typeof meta>

const animatedColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    icon: "📋",
    tasks: [
      {
        id: "1",
        title: "Smooth entrance animations",
        description: "Cards fade in and slide up on mount",
        columnId: "todo",
        priority: "high",
        tags: ["animation", "framer-motion"],
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        title: "Drag animations",
        description: "Cards rotate and scale while dragging",
        columnId: "todo",
        priority: "medium",
        tags: ["interaction", "ux"],
        createdAt: new Date("2024-01-14"),
      },
      {
        id: "3",
        title: "Staggered tag animations",
        description: "Tags appear with a stagger effect",
        columnId: "todo",
        priority: "low",
        tags: ["polish", "details", "microinteractions"],
        createdAt: new Date("2024-01-13"),
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: "🔄",
    tasks: [
      {
        id: "4",
        title: "Hover effects",
        description: "Subtle scale on hover for better feedback",
        columnId: "in-progress",
        priority: "medium",
        tags: ["interaction"],
        createdAt: new Date("2024-01-12"),
        assignee: { name: "Motion Designer", avatar: "/placeholder.svg?height=32&width=32" },
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    icon: "👀",
    tasks: [],
  },
  {
    id: "done",
    title: "Done",
    icon: "✅",
    tasks: [
      {
        id: "5",
        title: "Layout animations",
        description: "Smooth transitions when cards reorder",
        columnId: "done",
        priority: "high",
        tags: ["animation", "completed"],
        createdAt: new Date("2024-01-10"),
      },
    ],
  },
]

export const AnimationShowcase: Story = {
  args: {
    initialColumns: animatedColumns,
  },
}
