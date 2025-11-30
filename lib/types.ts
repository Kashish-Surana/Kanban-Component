export type Priority = "low" | "medium" | "high" | "urgent"
export type ColumnId = "todo" | "in-progress" | "review" | "done"

export interface Task {
  id: string
  title: string
  description: string
  columnId: string
  priority: Priority
  tags: string[]
  createdAt: Date
  assignee?: {
    name: string
    avatar?: string
  }
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
  icon?: string
}

export interface BoardState {
  columns: Column[]
  searchQuery: string
  filterTags: string[]
  sortBy: "priority" | "date" | "none"
}

export interface DeletedTask {
  task: Task
  columnId: string
  index: number
  deletedAt: number
}
