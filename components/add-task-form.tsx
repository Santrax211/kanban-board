"use client"

import type React from "react"
import { useState } from "react"
import { useTaskStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddTaskFormProps {
  column: string
  onClose: () => void
}

export function AddTaskForm({ column, onClose }: AddTaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [dueDate, setDueDate] = useState("")
  const [assignee, setAssignee] = useState("")
  const [tags, setTags] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { addTask } = useTaskStore()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) {
      newErrors.title = "El título es requerido"
    }
    if (title.trim().length > 100) {
      newErrors.title = "El título no puede exceder 100 caracteres"
    }
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      column: column as "pending" | "in-progress" | "done",
      dueDate: dueDate || undefined,
      assignee: assignee.trim() || undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    })

    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
    setAssignee("")
    setTags("")
    setErrors({})
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Input
          placeholder="Título de la tarea..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (errors.title) setErrors({ ...errors, title: "" })
          }}
          className={`text-sm ${errors.title ? "border-destructive" : ""}`}
          autoFocus
        />
        {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
      </div>

      <textarea
        placeholder="Descripción (opcional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        rows={2}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="low">Prioridad Baja</option>
        <option value="medium">Prioridad Media</option>
        <option value="high">Prioridad Alta</option>
      </select>

      <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="text-sm" />

      <Input
        placeholder="Asignado a (opcional)..."
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        className="text-sm"
      />

      <Input
        placeholder="Etiquetas separadas por comas (opcional)..."
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="text-sm"
      />

      <div className="flex gap-2">
        <Button type="submit" size="sm" className="flex-1" disabled={!title.trim()}>
          Agregar
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
  )
}
