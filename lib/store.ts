import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Task {
  id: string
  title: string
  description?: string
  column: "pending" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  dueDate?: string
  tags?: string[]
  assignee?: string
  createdAt: string
  updatedAt: string
}

interface TaskStore {
  tasks: Task[]
  history: Task[][]
  historyIndex: number
  searchQuery: string
  selectedTags: string[]
  selectedPriority: string | null

  // Task operations
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, column: "pending" | "in-progress" | "done") => void
  updateTask: (id: string, updates: Partial<Task>) => void

  // Search & Filter
  setSearchQuery: (query: string) => void
  setSelectedTags: (tags: string[]) => void
  setSelectedPriority: (priority: string | null) => void

  // History
  undo: () => void
  redo: () => void

  // Computed
  getFilteredTasks: () => Task[]
  getAllTags: () => string[]
  getStats: () => { pending: number; inProgress: number; done: number; total: number }
}

const addToHistory = (state: TaskStore, newTasks: Task[]) => {
  const newHistory = state.history.slice(0, state.historyIndex + 1)
  newHistory.push(newTasks)
  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
  }
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: "1",
          title: "Diseñar interfaz de usuario",
          description: "Crear mockups para el dashboard",
          column: "pending",
          priority: "high",
          tags: ["design", "ui"],
          assignee: "Juan",
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Implementar autenticación",
          description: "Configurar JWT y sesiones",
          column: "in-progress",
          priority: "high",
          tags: ["backend", "security"],
          assignee: "María",
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Escribir documentación",
          column: "done",
          priority: "medium",
          tags: ["docs"],
          assignee: "Carlos",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      history: [],
      historyIndex: -1,
      searchQuery: "",
      selectedTags: [],
      selectedPriority: null,

      addTask: (task) =>
        set((state) => {
          const newTask: Task = {
            ...task,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          const newTasks = [...state.tasks, newTask]
          return {
            tasks: newTasks,
            ...addToHistory(state, newTasks),
          }
        }),

      deleteTask: (id) =>
        set((state) => {
          const newTasks = state.tasks.filter((task) => task.id !== id)
          return {
            tasks: newTasks,
            ...addToHistory(state, newTasks),
          }
        }),

      moveTask: (id, column) =>
        set((state) => {
          const newTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, column, updatedAt: new Date().toISOString() } : task,
          )
          return {
            tasks: newTasks,
            ...addToHistory(state, newTasks),
          }
        }),

      updateTask: (id, updates) =>
        set((state) => {
          const newTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task,
          )
          return {
            tasks: newTasks,
            ...addToHistory(state, newTasks),
          }
        }),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedTags: (tags) => set({ selectedTags: tags }),
      setSelectedPriority: (priority) => set({ selectedPriority: priority }),

      undo: () =>
        set((state) => {
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1
            return {
              tasks: state.history[newIndex],
              historyIndex: newIndex,
            }
          }
          return state
        }),

      redo: () =>
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1
            return {
              tasks: state.history[newIndex],
              historyIndex: newIndex,
            }
          }
          return state
        }),

      getFilteredTasks: () => {
        const state = get()
        return state.tasks.filter((task) => {
          const matchesSearch =
            task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(state.searchQuery.toLowerCase())

          const matchesTags =
            state.selectedTags.length === 0 || state.selectedTags.some((tag) => task.tags?.includes(tag))

          const matchesPriority = state.selectedPriority === null || task.priority === state.selectedPriority

          return matchesSearch && matchesTags && matchesPriority
        })
      },

      getAllTags: () => {
        const state = get()
        const tags = new Set<string>()
        state.tasks.forEach((task) => {
          task.tags?.forEach((tag) => tags.add(tag))
        })
        return Array.from(tags).sort()
      },

      getStats: () => {
        const state = get()
        const filtered = state.getFilteredTasks()
        return {
          pending: filtered.filter((t) => t.column === "pending").length,
          inProgress: filtered.filter((t) => t.column === "in-progress").length,
          done: filtered.filter((t) => t.column === "done").length,
          total: filtered.length,
        }
      },
    }),
    {
      name: "kanban-store",
    },
  ),
)
