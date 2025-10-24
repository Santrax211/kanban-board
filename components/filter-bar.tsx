"use client"

import { useTaskStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"
import { useState } from "react"

export function FilterBar() {
  const { selectedTags, selectedPriority, setSelectedTags, setSelectedPriority, getAllTags } = useTaskStore()
  const allTags = getAllTags()
  const [showFilters, setShowFilters] = useState(false)

  const priorities = ["low", "medium", "high"]
  const priorityLabels = { low: "Baja", medium: "Media", high: "Alta" }

  const hasActiveFilters = selectedTags.length > 0 || selectedPriority !== null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button
          variant={hasActiveFilters ? "default" : "outline"}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              {selectedTags.length + (selectedPriority ? 1 : 0)}
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedTags([])
              setSelectedPriority(null)
            }}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          {/* Priority Filter */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Prioridad</p>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <Button
                  key={priority}
                  variant={selectedPriority === priority ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPriority(selectedPriority === priority ? null : priority)}
                >
                  {priorityLabels[priority as keyof typeof priorityLabels]}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Etiquetas</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedTags(
                        selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag],
                      )
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
