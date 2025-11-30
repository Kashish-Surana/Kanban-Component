"use client"

import { Droppable } from "@hello-pangea/dnd"
import type { Column, Task } from "@/lib/types"
import { TaskCard } from "./TaskCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface KanbanColumnProps {
  column: Column
  onAddTask: (columnId: string) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function KanbanColumn({ column, onAddTask, onEditTask, onDeleteTask }: KanbanColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-w-[320px] max-w-[320px] bg-muted/40 rounded-2xl border border-border shadow-sm"
    >
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          {column.icon && <span className="text-xl">{column.icon}</span>}
          <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
          <motion.span
            key={column.tasks.length}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium"
          >
            {column.tasks.length}
          </motion.span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onAddTask(column.id)} className="h-7 w-7 p-0 hover:bg-accent">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add task</span>
        </Button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <motion.div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 space-y-3 min-h-[200px] overflow-y-auto transition-colors ${
              snapshot.isDraggingOver ? "bg-accent/20" : ""
            }`}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode="popLayout">
              {column.tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} onEdit={onEditTask} onDelete={onDeleteTask} />
              ))}
            </AnimatePresence>
            {provided.placeholder}
            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center justify-center py-12 text-muted-foreground"
              >
                <p className="text-sm">No tasks yet</p>
                <p className="text-xs mt-1">Click + to add one</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </Droppable>
    </motion.div>
  )
}
