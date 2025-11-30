"use client"

import type { Task } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GripVertical, Pencil, Trash2 } from "lucide-react"
import { Draggable } from "@hello-pangea/dnd"

interface KanbanTaskProps {
  task: Task
  index: number
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function KanbanTask({ task, index, onEdit, onDelete }: KanbanTaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-3 mb-2 transition-all hover:shadow-md ${
            snapshot.isDragging ? "shadow-lg ring-2 ring-primary/20 rotate-2" : ""
          }`}
        >
          <div className="flex items-start gap-2">
            <div
              {...provided.dragHandleProps}
              className="mt-1 text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing"
              aria-label="Drag handle"
            >
              <GripVertical className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1 text-card-foreground">{task.title}</h4>
              {task.description && <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onEdit(task)}
                aria-label="Edit task"
              >
                <Pencil className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => onDelete(task.id)}
                aria-label="Delete task"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </Draggable>
  )
}
