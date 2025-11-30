"use client"

import { useState, useEffect, useCallback } from "react"
import type { Column, Task, BoardState, DeletedTask } from "@/lib/types"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import { KanbanColumn } from "./Column"
import { TaskDetailsModal } from "./TaskDetailsModal"
import { BoardToolbar } from "./BoardToolbar"
import { filterTasks, sortTasks } from "@/lib/kanban-utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Undo2 } from "lucide-react"
import { motion } from "framer-motion"

interface BoardProps {
  initialColumns?: Column[]
  onDataChange?: (columns: Column[]) => void
}

const defaultColumns: Column[] = [
  { id: "todo", title: "To Do", icon: "📋", tasks: [] },
  { id: "in-progress", title: "In Progress", icon: "🔄", tasks: [] },
  { id: "review", title: "Review", icon: "👀", tasks: [] },
  { id: "done", title: "Done", icon: "✅", tasks: [] },
]

export function Board({ initialColumns = defaultColumns, onDataChange }: BoardProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [boardState, setBoardState] = useState<BoardState>({
    columns: initialColumns,
    searchQuery: "",
    filterTags: [],
    sortBy: "none",
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [targetColumnId, setTargetColumnId] = useState<string>("")
  const [deletedTasks, setDeletedTasks] = useState<DeletedTask[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setColumns(initialColumns)
    setBoardState((prev) => ({ ...prev, columns: initialColumns }))
  }, [initialColumns])

  useEffect(() => {
    if (onDataChange) {
      onDataChange(columns)
    }
  }, [columns, onDataChange])

  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result

    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((col) => col.id === source.droppableId)
      const destColumn = prevColumns.find((col) => col.id === destination.droppableId)

      if (!sourceColumn || !destColumn) return prevColumns

      const sourceTasks = [...sourceColumn.tasks]
      const [movedTask] = sourceTasks.splice(source.index, 1)
      movedTask.columnId = destination.droppableId

      if (source.droppableId === destination.droppableId) {
        sourceTasks.splice(destination.index, 0, movedTask)
        return prevColumns.map((col) => (col.id === source.droppableId ? { ...col, tasks: sourceTasks } : col))
      } else {
        const destTasks = [...destColumn.tasks]
        destTasks.splice(destination.index, 0, movedTask)

        return prevColumns.map((col) => {
          if (col.id === source.droppableId) return { ...col, tasks: sourceTasks }
          if (col.id === destination.droppableId) return { ...col, tasks: destTasks }
          return col
        })
      }
    })
  }, [])

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

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      setColumns((prevColumns) => {
        const columnWithTask = prevColumns.find((col) => col.tasks.some((t) => t.id === taskId))
        if (!columnWithTask) return prevColumns

        const taskIndex = columnWithTask.tasks.findIndex((t) => t.id === taskId)
        const deletedTask = columnWithTask.tasks[taskIndex]

        // Store for undo
        setDeletedTasks((prev) => [
          ...prev,
          {
            task: deletedTask,
            columnId: columnWithTask.id,
            index: taskIndex,
            deletedAt: Date.now(),
          },
        ])

        return prevColumns.map((col) => ({
          ...col,
          tasks: col.tasks.filter((task) => task.id !== taskId),
        }))
      })

      toast({
        title: "Task deleted",
        description: "Task has been removed from the board.",
        action: (
          <Button variant="outline" size="sm" onClick={() => handleUndoDelete()}>
            <Undo2 className="h-4 w-4 mr-1" />
            Undo
          </Button>
        ),
      })
    },
    [toast],
  )

  const handleUndoDelete = useCallback(() => {
    setDeletedTasks((prev) => {
      if (prev.length === 0) return prev

      const lastDeleted = prev[prev.length - 1]

      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id === lastDeleted.columnId) {
            const newTasks = [...col.tasks]
            newTasks.splice(lastDeleted.index, 0, lastDeleted.task)
            return { ...col, tasks: newTasks }
          }
          return col
        }),
      )

      return prev.slice(0, -1)
    })

    toast({
      title: "Task restored",
      description: "Task has been restored to the board.",
    })
  }, [toast])

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      setColumns((prevColumns) =>
        prevColumns.map((col) => ({
          ...col,
          tasks: col.tasks.map((task) => (task.id === selectedTask.id ? { ...task, ...taskData } : task)),
        })),
      )
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: taskData.title || "",
        description: taskData.description || "",
        columnId: targetColumnId,
        priority: taskData.priority || "medium",
        tags: taskData.tags || [],
        createdAt: new Date(),
        assignee: taskData.assignee,
      }

      setColumns((prevColumns) =>
        prevColumns.map((col) => (col.id === targetColumnId ? { ...col, tasks: [...col.tasks, newTask] } : col)),
      )
    }
  }

  const handleSearch = (query: string) => {
    setBoardState((prev) => ({ ...prev, searchQuery: query }))
  }

  const handleFilterTags = (tags: string[]) => {
    setBoardState((prev) => ({ ...prev, filterTags: tags }))
  }

  const handleSort = (sortBy: "priority" | "date" | "none") => {
    setBoardState((prev) => ({ ...prev, sortBy }))
  }

  const getFilteredAndSortedTasks = (columnTasks: Task[]) => {
    const filtered = filterTasks(columnTasks, boardState.searchQuery, boardState.filterTags)
    return sortTasks(filtered, boardState.sortBy)
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <BoardToolbar
        columns={columns}
        searchQuery={boardState.searchQuery}
        filterTags={boardState.filterTags}
        sortBy={boardState.sortBy}
        onSearch={handleSearch}
        onFilterTags={handleFilterTags}
        onSort={handleSort}
        onUndoDelete={deletedTasks.length > 0 ? handleUndoDelete : undefined}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div
          className="flex gap-4 overflow-x-auto pb-4 flex-1 px-1"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {columns.map((column) => {
            const processedTasks = getFilteredAndSortedTasks(column.tasks)
            return (
              <KanbanColumn
                key={column.id}
                column={{ ...column, tasks: processedTasks }}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            )
          })}
        </motion.div>
      </DragDropContext>

      <TaskDetailsModal open={dialogOpen} onOpenChange={setDialogOpen} task={selectedTask} onSave={handleSaveTask} />
    </motion.div>
  )
}
