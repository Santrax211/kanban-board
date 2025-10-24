"use client"

import { useTaskStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useTaskStore()

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Buscar tareas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSearchQuery("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
