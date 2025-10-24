"use client"

import { useTaskStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle, Zap } from "lucide-react"

export function BoardStats() {
  const { getStats } = useTaskStore()
  const stats = getStats()

  const statItems = [
    {
      label: "Pendiente",
      value: stats.pending,
      icon: AlertCircle,
      color: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-blue-100/50 dark:bg-blue-900/30",
    },
    {
      label: "En Progreso",
      value: stats.inProgress,
      icon: Clock,
      color: "text-amber-700 dark:text-amber-300",
      bgColor: "bg-amber-100/50 dark:bg-amber-900/30",
    },
    {
      label: "Completadas",
      value: stats.done,
      icon: CheckCircle2,
      color: "text-emerald-700 dark:text-emerald-300",
      bgColor: "bg-emerald-100/50 dark:bg-emerald-900/30",
    },
    {
      label: "Total",
      value: stats.total,
      icon: Zap,
      color: "text-purple-700 dark:text-purple-300",
      bgColor: "bg-purple-100/50 dark:bg-purple-900/30",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
              </div>
              <div className={`rounded-lg ${item.bgColor} p-3`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
