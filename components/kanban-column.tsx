"use client"

import { useDroppable } from "@dnd-kit/core"
import type { Task } from "@/lib/store"
import { TaskCard } from "./task-card"
import { AddTaskForm } from "./add-task-form"
import { Plus } from "lucide-react"
import { useState } from "react"

interface KanbanColumnProps {
  id: string
  title: string
  color: string
  tasks: Task[]
}

export function KanbanColumn({ id, title, color, tasks }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id })
  const [showForm, setShowForm] = useState(false)

  const completedCount = tasks.filter((t) => t.column === "done").length
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <div ref={setNodeRef} className={`rounded-lg border border-border p-4 ${color} min-h-96 flex flex-col`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground">{title}</h2>
          <p className="text-xs text-muted-foreground">
            {tasks.length} {tasks.length === 1 ? "tarea" : "tareas"}
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {tasks.length}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">No hay tareas aquí</p>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        {showForm ? (
          <AddTaskForm column={id} onClose={() => setShowForm(false)} />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="flex w-full items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
            Agregar tarea
          </button>
        )}
      </div>
    </div>
  )
}
