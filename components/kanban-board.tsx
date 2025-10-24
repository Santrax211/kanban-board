"use client"

import { useCallback, useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, closestCorners } from "@dnd-kit/core"
import { useTaskStore } from "@/lib/store"
import { KanbanColumn } from "./kanban-column"
import { SearchBar } from "./search-bar"
import { FilterBar } from "./filter-bar"
import { BoardStats } from "./board-stats"
import { HistoryControls } from "./history-controls"

export function KanbanBoard() {
  const { tasks, moveTask, getFilteredTasks } = useTaskStore()
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setDraggedTask(null)

      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      const draggedTask = tasks.find((t) => t.id === activeId)
      if (!draggedTask) return

      let targetColumn = overId
      if (tasks.some((t) => t.id === overId)) {
        const targetTask = tasks.find((t) => t.id === overId)
        targetColumn = targetTask?.column || "pending"
      }

      moveTask(activeId, targetColumn as "pending" | "in-progress" | "done")
    },
    [tasks, moveTask],
  )

  const columns = [
    { id: "pending", title: "Pendiente", color: "bg-blue-50/50 dark:bg-slate-800/50" },
    { id: "in-progress", title: "En Progreso", color: "bg-amber-50/50 dark:bg-slate-800/50" },
    { id: "done", title: "Hecho", color: "bg-green-50/50 dark:bg-slate-800/50" },
  ]

  const filteredTasks = getFilteredTasks()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar />
          <HistoryControls />
        </div>
        <FilterBar />
        <BoardStats />
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              tasks={filteredTasks.filter((t) => t.column === column.id)}
            />
          ))}
        </div>
        <DragOverlay>{draggedTask && <div className="rounded-lg bg-card p-4 shadow-lg" />}</DragOverlay>
      </DndContext>
    </div>
  )
}
