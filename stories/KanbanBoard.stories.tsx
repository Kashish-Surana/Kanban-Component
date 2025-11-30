"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Board } from "@/components/kanban/Board"
import type { Priority } from "@/lib/types"
import { useState } from "react"

const meta = {
  title: "Kanban/Board",
  component: Board,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A fully-featured Kanban board with drag-and-drop, search, filtering, and sorting capabilities. Supports dark mode, mobile responsiveness, and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-6 min-h-screen bg-background">
        <div className="h-[700px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Board>

export default meta
type Story = StoryObj<typeof meta>

const generateTask = (id: string, columnId: string, overrides?: any) => ({
  id,
  title: overrides?.title || `Task ${id}`,
  description: overrides?.description || `Description for task ${id}`,
  columnId,
  priority: overrides?.priority || ("medium" as Priority),
  tags: overrides?.tags || ["development"],
  createdAt: overrides?.createdAt || new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  assignee: overrides?.assignee,
})

// 1. Default Story - Standard board with 5-8 tasks showing drag-and-drop
export const Default: Story = {
  args: {
    initialColumns: [
      {
        id: "todo",
        title: "To Do",
        icon: "📋",
        tasks: [
          generateTask("1", "todo", {
            title: "Design new landing page",
            description: "Create wireframes and mockups for the new marketing site",
            priority: "high",
            tags: ["design", "frontend"],
            assignee: { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32" },
          }),
          generateTask("2", "todo", {
            title: "Review API documentation",
            description: "Update docs for the new authentication endpoints",
            priority: "medium",
            tags: ["docs", "backend"],
          }),
          generateTask("3", "todo", {
            title: "Setup monitoring",
            description: "Configure error tracking and performance monitoring",
            priority: "low",
            tags: ["devops"],
            assignee: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
          }),
        ],
      },
      {
        id: "in-progress",
        title: "In Progress",
        icon: "🔄",
        tasks: [
          generateTask("4", "in-progress", {
            title: "Build user dashboard",
            description: "Implement analytics charts and data visualization",
            priority: "high",
            tags: ["frontend", "dashboard"],
            assignee: { name: "Alex Kim", avatar: "/placeholder.svg?height=32&width=32" },
          }),
          generateTask("5", "in-progress", {
            title: "Optimize database queries",
            description: "Add indexes and refactor slow queries",
            priority: "urgent",
            tags: ["backend", "performance"],
          }),
        ],
      },
      {
        id: "review",
        title: "Review",
        icon: "👀",
        tasks: [
          generateTask("6", "review", {
            title: "Code review for auth module",
            description: "Review PR #234 for security best practices",
            priority: "urgent",
            tags: ["security", "review"],
            assignee: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
          }),
        ],
      },
      {
        id: "done",
        title: "Done",
        icon: "✅",
        tasks: [
          generateTask("7", "done", {
            title: "Setup CI/CD pipeline",
            description: "Configured GitHub Actions for automated deployments",
            priority: "low",
            tags: ["devops", "automation"],
            assignee: { name: "John Smith", avatar: "/placeholder.svg?height=32&width=32" },
          }),
          generateTask("8", "done", {
            title: "Database migration",
            description: "Migrated to PostgreSQL 15",
            priority: "medium",
            tags: ["backend", "migration"],
          }),
        ],
      },
    ],
  },
}

// 2. Empty Story - Board with no tasks showing empty states
export const Empty: Story = {
  args: {
    initialColumns: [
      { id: "todo", title: "To Do", icon: "📋", tasks: [] },
      { id: "in-progress", title: "In Progress", icon: "🔄", tasks: [] },
      { id: "review", title: "Review", icon: "👀", tasks: [] },
      { id: "done", title: "Done", icon: "✅", tasks: [] },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "An empty Kanban board with all columns visible but no tasks. Shows placeholder states.",
      },
    },
  },
}

// 3. Large Dataset Story - Board with 30+ tasks for performance demonstration
export const LargeDataset: Story = {
  args: {
    initialColumns: [
      {
        id: "todo",
        title: "To Do",
        icon: "📋",
        tasks: Array.from({ length: 10 }, (_, i) => {
          const priorities: Priority[] = ["low", "medium", "high", "urgent"]
          const tagOptions = [["frontend"], ["backend"], ["design"], ["devops"], ["security"], ["testing"]]
          return generateTask(`todo-${i}`, "todo", {
            title: `Todo Task #${i + 1}: ${["Implement feature", "Fix bug", "Add test", "Update docs"][i % 4]}`,
            description: `Detailed description for todo task ${i + 1}. This task requires attention and should be completed soon.`,
            priority: priorities[i % 4],
            tags: tagOptions[i % 6],
            assignee:
              i % 3 === 0
                ? { name: `Developer ${(i % 5) + 1}`, avatar: `/placeholder.svg?height=32&width=32` }
                : undefined,
          })
        }),
      },
      {
        id: "in-progress",
        title: "In Progress",
        icon: "🔄",
        tasks: Array.from({ length: 8 }, (_, i) => {
          const priorities: Priority[] = ["medium", "high", "urgent"]
          return generateTask(`progress-${i}`, "in-progress", {
            title: `In Progress #${i + 1}: ${["Building API", "Creating UI", "Testing feature", "Refactoring code"][i % 4]}`,
            description: `Currently working on this task. Progress: ${((i + 1) * 12.5).toFixed(0)}%`,
            priority: priorities[i % 3],
            tags: ["development", "active"],
            assignee: { name: `Developer ${(i % 5) + 1}`, avatar: `/placeholder.svg?height=32&width=32` },
          })
        }),
      },
      {
        id: "review",
        title: "Review",
        icon: "👀",
        tasks: Array.from({ length: 6 }, (_, i) =>
          generateTask(`review-${i}`, "review", {
            title: `Review Task #${i + 1}: Code review needed`,
            description: `PR #${1000 + i} ready for review. Please check for code quality and best practices.`,
            priority: i % 2 === 0 ? "high" : "urgent",
            tags: ["review", "quality"],
            assignee: { name: `Reviewer ${(i % 3) + 1}`, avatar: `/placeholder.svg?height=32&width=32` },
          }),
        ),
      },
      {
        id: "done",
        title: "Done",
        icon: "✅",
        tasks: Array.from({ length: 12 }, (_, i) =>
          generateTask(`done-${i}`, "done", {
            title: `Completed Task #${i + 1}`,
            description: `Successfully completed and deployed to production.`,
            priority: "low",
            tags: ["completed"],
            createdAt: new Date(Date.now() - (i + 7) * 24 * 60 * 60 * 1000),
          }),
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A Kanban board with 36 tasks spread across all columns. Useful for testing performance, scrolling behavior, and visual density.",
      },
    },
  },
}

// 4. Mobile Responsive Story - Optimized for mobile viewport
export const MobileResponsive: Story = {
  args: {
    initialColumns: [
      {
        id: "todo",
        title: "To Do",
        icon: "📋",
        tasks: [
          generateTask("m1", "todo", {
            title: "Mobile task 1",
            description: "Optimized for touch interactions",
            priority: "high",
            tags: ["mobile"],
          }),
          generateTask("m2", "todo", {
            title: "Mobile task 2",
            description: "Swipe and drag on mobile",
            priority: "medium",
            tags: ["mobile"],
          }),
        ],
      },
      {
        id: "in-progress",
        title: "In Progress",
        icon: "🔄",
        tasks: [
          generateTask("m3", "in-progress", {
            title: "Working on mobile",
            description: "Touch-friendly interface",
            priority: "high",
            tags: ["mobile"],
          }),
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
          generateTask("m4", "done", {
            title: "Mobile completed",
            description: "Done on mobile device",
            priority: "low",
            tags: ["mobile"],
          }),
        ],
      },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
    docs: {
      description: {
        story:
          "Kanban board optimized for mobile devices (375px width). Features touch-friendly drag-and-drop and responsive layout.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-2 min-h-screen bg-background">
        <div className="h-[667px]">
          <Story />
        </div>
      </div>
    ),
  ],
}

// 5. Interactive Playground Story - Fully interactive with controls
export const InteractivePlayground: Story = {
  render: (args) => {
    const PlaygroundBoard = () => {
      const [darkMode, setDarkMode] = useState(args.darkMode || false)
      const [columnCount, setColumnCount] = useState(args.columnCount || 4)
      const [enableDrag, setEnableDrag] = useState(args.enableDragDrop !== false)
      const [compactMode, setCompactMode] = useState(args.compactMode || false)

      const baseColumns = [
        { id: "todo", title: "To Do", icon: "📋" },
        { id: "in-progress", title: "In Progress", icon: "🔄" },
        { id: "review", title: "Review", icon: "👀" },
        { id: "done", title: "Done", icon: "✅" },
        { id: "backlog", title: "Backlog", icon: "📦" },
        { id: "archived", title: "Archived", icon: "📁" },
      ]

      const columns = baseColumns.slice(0, columnCount).map((col, idx) => ({
        ...col,
        tasks:
          idx < 2
            ? [
                generateTask(`${col.id}-1`, col.id, {
                  title: `Sample task in ${col.title}`,
                  description: "Interactive playground demo task",
                  priority: args.priority || "medium",
                  tags: ["demo"],
                }),
              ]
            : [],
      }))

      return (
        <div className={darkMode ? "dark" : ""}>
          <div className={`min-h-screen bg-background p-6 transition-colors ${compactMode ? "text-sm" : ""}`}>
            <div className="mb-4 p-4 bg-card border rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Interactive Controls</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Dark Mode</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enableDrag}
                    onChange={(e) => setEnableDrag(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Enable Drag & Drop</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Compact Mode</span>
                </label>
                <label className="flex flex-col gap-1">
                  <span>Columns: {columnCount}</span>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    value={columnCount}
                    onChange={(e) => setColumnCount(Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </label>
              </div>
            </div>
            <div className="h-[600px]">
              <Board initialColumns={columns} />
            </div>
          </div>
        </div>
      )
    }

    return <PlaygroundBoard />
  },
  args: {
    darkMode: false,
    columnCount: 4,
    priority: "medium",
    enableDragDrop: true,
    compactMode: false,
  },
  argTypes: {
    darkMode: {
      control: "boolean",
      description: "Toggle dark mode theme",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    columnCount: {
      control: { type: "number", min: 2, max: 6, step: 1 },
      description: "Number of columns to display",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: 4 },
      },
    },
    priority: {
      control: { type: "select", options: ["low", "medium", "high", "urgent"] },
      description: "Default task priority",
      table: {
        type: { summary: "Priority" },
        defaultValue: { summary: "medium" },
      },
    },
    enableDragDrop: {
      control: "boolean",
      description: "Enable or disable drag and drop functionality",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
    },
    compactMode: {
      control: "boolean",
      description: "Toggle compact card display mode",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive playground with controls for dark mode, column count, task priorities, drag-and-drop, and compact mode. Use the controls panel to experiment with different configurations.",
      },
    },
    controls: { expanded: true },
  },
  decorators: [],
}

// Dark Mode Story
export const DarkMode: Story = {
  args: {
    initialColumns: [
      {
        id: "todo",
        title: "To Do",
        icon: "📋",
        tasks: [
          generateTask("d1", "todo", {
            title: "Dark mode task",
            description: "Testing dark theme",
            priority: "high",
            tags: ["ui", "theme"],
          }),
        ],
      },
      {
        id: "in-progress",
        title: "In Progress",
        icon: "🔄",
        tasks: [],
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
        tasks: [],
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <div className="p-6 min-h-screen bg-background">
          <div className="h-[700px]">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Kanban board with dark mode enabled. All colors and contrasts are optimized for dark theme viewing.",
      },
    },
  },
}

// Tablet Responsive Story
export const TabletResponsive: Story = {
  args: {
    initialColumns: [
      {
        id: "todo",
        title: "To Do",
        icon: "📋",
        tasks: [
          generateTask("t1", "todo", {
            title: "Tablet optimization",
            description: "Testing tablet layout",
            priority: "medium",
            tags: ["responsive"],
          }),
          generateTask("t2", "todo", {
            title: "iPad layout test",
            description: "Ensuring proper display on tablets",
            priority: "high",
            tags: ["responsive"],
          }),
        ],
      },
      {
        id: "in-progress",
        title: "In Progress",
        icon: "🔄",
        tasks: [
          generateTask("t3", "in-progress", {
            title: "Tablet gestures",
            description: "Touch interactions on tablet",
            priority: "medium",
            tags: ["responsive"],
          }),
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
        tasks: [],
      },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story:
          "Kanban board optimized for tablet devices (768px width). Shows how the layout adapts to medium-sized screens.",
      },
    },
  },
}
