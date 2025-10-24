"use client"

import { KanbanBoard } from "@/components/kanban-board"
import { ThemeToggle } from "@/components/theme-toggle"
import { Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Task Manager Pro</h1>
              <p className="text-sm text-muted-foreground">Organiza tu trabajo con drag & drop</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <KanbanBoard />
      </main>
    </div>
  )
}
