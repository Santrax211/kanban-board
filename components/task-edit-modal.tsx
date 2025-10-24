"use client"

import type React from "react"

import { useState } from "react"
import { type Task, useTaskStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface TaskEditModalProps {
  task: Task
  onClose: () => void
}

export function TaskEditModal({ task, onClose }: TaskEditModalProps) {
  const { updateTask } = useTaskStore()
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || "")
  const [priority, setPriority] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.dueDate || "")
  const [assignee, setAssignee] = useState(task.assignee || "")
  const [tags, setTags] = useState(task.tags?.join(", ") || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    updateTask(task.id, {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      assignee: assignee.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg bg-card p-6 shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Editar tarea</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Título</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título de la tarea..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción (opcional)..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Prioridad</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Fecha de vencimiento</label>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Asignado a</label>
            <Input
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Nombre de la persona..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Etiquetas</label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Separadas por comas (ej: design, ui, urgent)"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Guardar cambios
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
