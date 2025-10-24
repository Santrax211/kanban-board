# 📋 Kanban Task Manager Pro

Un gestor de tareas moderno, profesional y responsivo con drag & drop estilo Trello, construido con Next.js, Zustand y @dnd-kit. Incluye búsqueda, filtrado avanzado, edición inline, undo/redo y mucho más.

## ✨ Características Principales

### 🎯 Gestión de Tareas
- **Drag & Drop**: Arrastra tareas entre columnas (Pendiente, En Progreso, Hecho)
- **Crear Tareas**: Formulario inline en cada columna con validación
- **Editar Tareas**: Modal completo para editar todos los campos
- **Eliminar Tareas**: Confirmación antes de eliminar para evitar accidentes
- **Prioridades**: Asigna prioridades (Baja, Media, Alta) con colores visuales

### 🔍 Búsqueda y Filtrado
- **Búsqueda en Tiempo Real**: Busca por título o descripción
- **Filtrar por Prioridad**: Muestra solo tareas de una prioridad específica
- **Filtrar por Etiquetas**: Categoriza tareas con tags personalizados
- **Filtros Combinados**: Usa múltiples filtros simultáneamente
- **Limpiar Filtros**: Botón rápido para resetear todos los filtros

### 📊 Estadísticas y Análisis
- **Tablero de Estadísticas**: Visualiza el progreso en tiempo real
- **Contador por Columna**: Ve cuántas tareas hay en cada estado
- **Estadísticas Filtradas**: Los números se actualizan según búsqueda y filtros
- **Indicadores Visuales**: Iconos y colores para mejor comprensión

### 🔄 Historial y Deshacer
- **Undo/Redo**: Deshaz y rehaz cambios fácilmente
- **Historial Completo**: Mantiene registro de todos los cambios
- **Atajos Intuitivos**: Botones claramente visibles en la interfaz

### 📅 Gestión Avanzada de Tareas
- **Fechas de Vencimiento**: Asigna fechas límite a tareas
- **Indicadores de Vencimiento**: 
  - 🔴 Rojo: Tareas retrasadas
  - 🟡 Amarillo: Tareas próximas a vencer (< 2 días)
- **Asignación de Usuarios**: Asigna tareas a personas específicas
- **Etiquetas/Tags**: Categoriza tareas con múltiples etiquetas
- **Descripciones**: Agrega detalles a cada tarea

### 🎨 Experiencia de Usuario
- **Tema Light/Dark**: Cambia entre modo claro y oscuro automáticamente
- **Responsivo**: Funciona perfectamente en móvil, tablet y desktop
- **Interfaz Intuitiva**: Diseño limpio y moderno con Tailwind CSS
- **Animaciones Suaves**: Transiciones visuales agradables
- **Feedback Visual**: Indicadores claros de interacción

### 💾 Persistencia
- **Almacenamiento Local**: Las tareas se guardan automáticamente en localStorage
- **Historial Persistente**: El undo/redo se mantiene entre sesiones
- **Sincronización Automática**: Cambios guardados al instante

## 🛠️ Stack Tecnológico

- **Next.js 16**: Framework React con App Router
- **Zustand**: Gestión de estado ligera y eficiente con middleware de persistencia
- **@dnd-kit**: Librería de drag & drop accesible y flexible
- **Tailwind CSS v4**: Estilos utilitarios modernos con temas
- **TypeScript**: Tipado estático para mayor seguridad
- **Lucide Icons**: Iconos SVG hermosos y consistentes
- **shadcn/ui**: Componentes accesibles y personalizables

## 📦 Instalación

### Opción 1: Usar shadcn CLI (Recomendado)

\`\`\`bash
npx shadcn-cli@latest init -d
npx shadcn-cli@latest add button input badge card
\`\`\`

### Opción 2: Descargar ZIP

1. Descarga el proyecto desde v0
2. Extrae el archivo ZIP
3. Instala las dependencias:

\`\`\`bash
npm install
\`\`\`

## 🚀 Uso

### Iniciar el servidor
\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Operaciones Básicas

1. **Crear Tareas**: Haz clic en "Agregar tarea" en cualquier columna
2. **Mover Tareas**: Arrastra las tarjetas entre columnas
3. **Editar Tareas**: Haz clic en una tarjeta para abrir el editor
4. **Eliminar Tareas**: Haz clic en el icono de papelera (requiere confirmación)
5. **Buscar**: Usa la barra de búsqueda en la parte superior
6. **Filtrar**: Haz clic en "Filtros" para aplicar filtros avanzados
7. **Deshacer/Rehacer**: Usa los botones de undo/redo
8. **Cambiar Tema**: Usa el botón en la esquina superior derecha

## 📱 Responsividad

- **Mobile**: Una columna por fila, interfaz optimizada para touch
- **Tablet**: Dos columnas por fila
- **Desktop**: Tres columnas por fila con máximo ancho

## 📂 Estructura del Proyecto

\`\`\`
├── app/
│   ├── layout.tsx              # Layout principal con tema
│   ├── page.tsx                # Página principal
│   └── globals.css             # Estilos globales y tokens de diseño
├── components/
│   ├── kanban-board.tsx        # Componente principal del tablero
│   ├── kanban-column.tsx       # Columna individual
│   ├── task-card.tsx           # Tarjeta de tarea con edición
│   ├── task-edit-modal.tsx     # Modal para editar tareas
│   ├── add-task-form.tsx       # Formulario para agregar tareas
│   ├── search-bar.tsx          # Barra de búsqueda
│   ├── filter-bar.tsx          # Panel de filtros
│   ├── board-stats.tsx         # Estadísticas del tablero
│   ├── history-controls.tsx    # Botones de undo/redo
│   ├── theme-toggle.tsx        # Botón para cambiar tema
│   └── ui/                     # Componentes shadcn/ui
├── lib/
│   └── store.ts                # Store de Zustand con todas las acciones
└── README.md                   # Este archivo
\`\`\`

## 🎨 Personalización

### Cambiar Colores

Edita los tokens de diseño en \`app/globals.css\`:

\`\`\`css
:root {
  --primary: oklch(0.55 0.2 262.881); /* Azul */
  --accent: oklch(0.55 0.2 262.881);
  /* ... más colores ... */
}

.dark {
  --primary: oklch(0.65 0.2 262.881);
  /* ... más colores en modo oscuro ... */
}
\`\`\`

### Agregar Nuevas Columnas

Modifica el array \`columns\` en \`components/kanban-board.tsx\`:

\`\`\`tsx
const columns = [
  { id: 'pending', title: 'Pendiente', color: 'bg-blue-50 dark:bg-blue-950' },
  { id: 'in-progress', title: 'En Progreso', color: 'bg-amber-50 dark:bg-amber-950' },
  { id: 'done', title: 'Hecho', color: 'bg-green-50 dark:bg-green-950' },
  { id: 'archived', title: 'Archivado', color: 'bg-gray-50 dark:bg-gray-950' },
]
\`\`\`

### Cambiar Usuarios Disponibles

Edita la lista de usuarios en \`components/task-edit-modal.tsx\` o \`components/add-task-form.tsx\`.

## 🔧 Características Avanzadas

### Búsqueda Personalizada

La búsqueda busca en:
- Título de la tarea
- Descripción de la tarea
- Es case-insensitive (no importa mayúsculas/minúsculas)

### Filtrado Combinado

Puedes combinar múltiples filtros:
- Prioridad + Etiquetas
- Prioridad + Búsqueda
- Etiquetas + Búsqueda
- Los tres simultáneamente

### Undo/Redo

Mantiene un historial completo de:
- Crear tareas
- Eliminar tareas
- Mover tareas
- Editar tareas

## 📊 Estadísticas

El tablero muestra en tiempo real:
- **Pendiente**: Tareas sin iniciar
- **En Progreso**: Tareas en desarrollo
- **Completadas**: Tareas finalizadas
- **Total**: Suma de todas las tareas (respeta filtros)

## 🌙 Tema Light/Dark

- Detección automática de preferencia del sistema
- Toggle manual en la esquina superior derecha
- Preferencia guardada en localStorage
- Transiciones suaves entre temas

## 🚀 Próximas Mejoras Sugeridas

- [ ] Integración con base de datos (Supabase, Firebase)
- [ ] Autenticación de usuarios
- [ ] Compartir tableros
- [ ] Comentarios en tareas
- [ ] Adjuntos en tareas
- [ ] Notificaciones de tareas vencidas
- [ ] Exportar a PDF/CSV
- [ ] Integración con calendario
- [ ] Webhooks y automatizaciones
- [ ] Historial de cambios detallado

## 💡 Tips y Trucos

1. **Búsqueda Rápida**: Usa la barra de búsqueda para encontrar tareas al instante
2. **Filtros Múltiples**: Combina filtros para vistas personalizadas
3. **Edición Rápida**: Haz clic en una tarjeta para editar todos los campos
4. **Deshacer Errores**: Usa Undo si eliminas algo por accidente
5. **Etiquetas Consistentes**: Usa las mismas etiquetas para mejor organización

## 📄 Licencia

MIT - Siéntete libre de usar este proyecto como desees.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de abrir issues o pull requests.

---

**Hecho con ❤️ usando v0 - Kanban Task Manager Pro**
