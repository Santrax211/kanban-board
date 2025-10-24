"use client"

import { useTaskStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Undo2, Redo2 } from "lucide-react"

export function HistoryControls() {
  const { history, historyIndex, undo, redo } = useTaskStore()

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={undo}
        disabled={!canUndo}
        title="Deshacer (Ctrl+Z)"
        className="gap-2 bg-transparent"
      >
        <Undo2 className="h-4 w-4" />
        <span className="hidden sm:inline">Deshacer</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={redo}
        disabled={!canRedo}
        title="Rehacer (Ctrl+Y)"
        className="gap-2 bg-transparent"
      >
        <span className="hidden sm:inline">Rehacer</span>
        <Redo2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
