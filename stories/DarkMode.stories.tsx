import type { Meta, StoryObj } from "@storybook/react"
import { Board } from "@/components/kanban/Board"
import type { Column } from "@/lib/types"

const meta = {
  title: "Kanban/Dark Mode",
  component: Board,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="dark">
        <div className="h-screen p-6 bg-background text-foreground">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Board>

export default meta
type Story = StoryObj<typeof meta>

const darkModeColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    icon: "📋",
    tasks: [
      {
        id: "1",
        title: "Implement dark mode",
        description: "Add theme switching capability",
        columnId: "todo",
        priority: "high",
        tags: ["ui", "theme"],
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        title: "Test accessibility",
        description: "Ensure dark mode meets WCAG standards",
        columnId: "todo",
        priority: "urgent",
        tags: ["accessibility", "testing"],
        createdAt: new Date("2024-01-16"),
        assignee: { name: "Alex Kim", avatar: "/placeholder.svg?height=32&width=32" },
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
        title: "Design dark mode palette",
        description: "Create color scheme for dark theme",
        columnId: "in-progress",
        priority: "medium",
        tags: ["design", "theme"],
        createdAt: new Date("2024-01-14"),
        assignee: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
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
        id: "4",
        title: "Research dark mode best practices",
        description: "Study popular apps and their implementations",
        columnId: "done",
        priority: "low",
        tags: ["research"],
        createdAt: new Date("2024-01-10"),
      },
    ],
  },
]

export const DarkTheme: Story = {
  args: {
    initialColumns: darkModeColumns,
  },
}
