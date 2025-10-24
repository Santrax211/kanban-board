"use client"

import type React from "react"

import { useDraggable } from "@dnd-kit/core"
import { type Task, useTaskStore } from "@/lib/store"
import { Trash2, Calendar, User } from "lucide-react"
import { useState } from "react"
import { TaskEditModal } from "./task-edit-modal"
import { Badge } from "@/components/ui/badge"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  })
  const { deleteTask } = useTaskStore()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const priorityColors = {
    low: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200",
    medium: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200",
    high: "bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-200",
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.column !== "done"
  const isDueSoon =
    task.dueDate &&
    new Date(task.dueDate) < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) &&
    new Date(task.dueDate) >= new Date() &&
    task.column !== "done"

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${task.title}"?`)) {
      deleteTask(task.id)
    }
  }

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={() => setShowEditModal(true)}
        className={`rounded-lg border-2 border-border bg-card p-3 shadow-sm transition-all cursor-grab active:cursor-grabbing ${
          isDragging ? "opacity-50 shadow-lg" : "hover:shadow-md hover:border-primary/50"
        } ${isOverdue ? "border-destructive/50" : ""} ${isDueSoon ? "border-amber-500/50" : ""}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground text-sm break-words">{task.title}</h3>
            {task.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{task.description}</p>}
          </div>
          <button
            onClick={handleDelete}
            className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1 hover:bg-destructive/10 rounded"
            title="Eliminar tarea"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${priorityColors[task.priority]}`}
            >
              {task.priority === "low" && "Baja"}
              {task.priority === "medium" && "Media"}
              {task.priority === "high" && "Alta"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {task.dueDate && (
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded ${
                  isOverdue
                    ? "bg-destructive/10 text-destructive"
                    : isDueSoon
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                <Calendar className="h-3 w-3" />
                {new Date(task.dueDate).toLocaleDateString("es-ES")}
              </div>
            )}
            {task.assignee && (
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10 text-primary">
                <User className="h-3 w-3" />
                {task.assignee}
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && <TaskEditModal task={task} onClose={() => setShowEditModal(false)} />}
    </>
  )
}
