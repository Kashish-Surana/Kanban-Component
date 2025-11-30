"use client"

import { Draggable } from "@hello-pangea/dnd"
import type { Task } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Edit2, Trash2, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getPriorityColor, getPriorityBorderColor, formatDate } from "@/lib/kanban-utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface TaskCardProps {
  task: Task
  index: number
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: snapshot.isDragging ? 1 : 1.02 }}
          layout
        >
          <Card
            className={`p-4 cursor-grab active:cursor-grabbing transition-all hover:shadow-md border-l-4 ${getPriorityBorderColor(
              task.priority,
            )} ${snapshot.isDragging ? "shadow-lg rotate-2 scale-105" : ""}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") onEdit(task)
              if (e.key === "Delete") onDelete(task.id)
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <h4 className="font-medium text-sm text-foreground flex-1 leading-snug">{task.title}</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-accent">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(task)
                    }}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(task.id)
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {task.description && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>}

            {task.tags.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-1 mb-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {task.tags.map((tag, i) => (
                  <motion.div
                    key={tag}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                  >
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <Badge variant="outline" className={`text-xs border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>

              <div className="flex items-center gap-2">
                {task.createdAt && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(task.createdAt)}</span>
                  </div>
                )}
                {task.assignee && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback className="text-[10px]">
                      {task.assignee.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </Draggable>
  )
}
