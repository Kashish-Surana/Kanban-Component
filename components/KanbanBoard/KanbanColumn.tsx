"use client"

import type { Column, Task } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { KanbanTask } from "./KanbanTask"
import { Droppable } from "@hello-pangea/dnd"

interface KanbanColumnProps {
  column: Column
  onAddTask: (columnId: string) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function KanbanColumn({ column, onAddTask, onEditTask, onDeleteTask }: KanbanColumnProps) {
  return (
    <div className="flex flex-col h-full min-w-[280px] w-[320px]">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onAddTask(column.id)}
          aria-label={`Add task to ${column.title}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 transition-colors ${
              snapshot.isDraggingOver ? "bg-accent/50 ring-2 ring-primary/20" : "bg-muted/30"
            }`}
          >
            <div className="space-y-2">
              {column.tasks.length === 0 && !snapshot.isDraggingOver && (
                <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                  {"No tasks yet"}
                </div>
              )}
              {column.tasks.map((task, index) => (
                <KanbanTask key={task.id} task={task} index={index} onEdit={onEditTask} onDelete={onDeleteTask} />
              ))}
              {provided.placeholder}
            </div>
          </Card>
        )}
      </Droppable>
    </div>
  )
}
