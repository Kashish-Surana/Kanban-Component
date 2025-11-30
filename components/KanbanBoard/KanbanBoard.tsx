"use client"

import { useState, useEffect } from "react"
import type { Column, Task } from "@/lib/types"
import { KanbanColumn } from "./KanbanColumn"
import { TaskDialog } from "./TaskDialog"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"

interface KanbanBoardProps {
  initialColumns?: Column[]
  onDataChange?: (columns: Column[]) => void
}

const defaultColumns: Column[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "review", title: "Review", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
]

export function KanbanBoard({ initialColumns = defaultColumns, onDataChange }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [targetColumnId, setTargetColumnId] = useState<string>("")

  useEffect(() => {
    if (onDataChange) {
      onDataChange(columns)
    }
  }, [columns, onDataChange])

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId)
    const destColumn = columns.find((col) => col.id === destination.droppableId)

    if (!sourceColumn || !destColumn) return

    const sourceTasks = [...sourceColumn.tasks]
    const [movedTask] = sourceTasks.splice(source.index, 1)
    movedTask.columnId = destination.droppableId

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask)
      setColumns(columns.map((col) => (col.id === source.droppableId ? { ...col, tasks: sourceTasks } : col)))
    } else {
      const destTasks = [...destColumn.tasks]
      destTasks.splice(destination.index, 0, movedTask)

      setColumns(
        columns.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, tasks: sourceTasks }
          }
          if (col.id === destination.droppableId) {
            return { ...col, tasks: destTasks }
          }
          return col
        }),
      )
    }
  }

  const handleAddTask = (columnId: string) => {
    setSelectedTask(null)
    setTargetColumnId(columnId)
    setDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setTargetColumnId(task.columnId)
    setDialogOpen(true)
  }

  const handleDeleteTask = (taskId: string) => {
    setColumns(
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      })),
    )
  }

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      // Edit existing task
      setColumns(
        columns.map((col) => ({
          ...col,
          tasks: col.tasks.map((task) => (task.id === selectedTask.id ? { ...task, ...taskData } : task)),
        })),
      )
    } else {
      // Add new task
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: taskData.title || "",
        description: taskData.description || "",
        columnId: targetColumnId,
      }

      setColumns(columns.map((col) => (col.id === targetColumnId ? { ...col, tasks: [...col.tasks, newTask] } : col)))
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 h-full">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskDialog open={dialogOpen} onOpenChange={setDialogOpen} task={selectedTask} onSave={handleSaveTask} />
    </>
  )
}
