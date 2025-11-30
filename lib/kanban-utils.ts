import type { Task, Priority } from "./types"

export const getPriorityColor = (priority: Priority): string => {
  const colors = {
    low: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    medium: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20",
    high: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20",
    urgent: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20",
  }
  return colors[priority]
}

export const getPriorityBorderColor = (priority: Priority): string => {
  const colors = {
    low: "border-l-blue-500",
    medium: "border-l-yellow-500",
    high: "border-l-orange-500",
    urgent: "border-l-red-500",
  }
  return colors[priority]
}

export const filterTasks = (tasks: Task[], searchQuery: string, filterTags: string[]): Task[] => {
  return tasks.filter((task) => {
    const matchesSearch =
      !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = filterTags.length === 0 || filterTags.some((tag) => task.tags.includes(tag))

    return matchesSearch && matchesTags
  })
}

export const sortTasks = (tasks: Task[], sortBy: "priority" | "date" | "none"): Task[] => {
  if (sortBy === "none") return tasks

  return [...tasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return 0
  })
}

export const formatDate = (date: Date): string => {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - new Date(date).getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`

  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export const getAllTags = (columns: { tasks: Task[] }[]): string[] => {
  const tagsSet = new Set<string>()
  columns.forEach((column) => {
    column.tasks.forEach((task) => {
      task.tags.forEach((tag) => tagsSet.add(tag))
    })
  })
  return Array.from(tagsSet).sort()
}
