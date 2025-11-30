# Kanban Board with Storybook

A modern, production-ready Kanban board built with Next.js, TypeScript, and Tailwind CSS, featuring full Storybook integration.

## Features

- **Drag & Drop**: Smooth task movement between columns using @hello-pangea/dnd
- **Task Management**: Create, edit, and delete tasks with a clean dialog interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Keyboard Accessible**: Full keyboard navigation and screen reader support
- **Dark Mode**: Beautiful dark theme with proper contrast
- **Storybook**: Complete component documentation and visual testing
- **TypeScript**: Fully typed for better developer experience
- **Enterprise Ready**: Clean, modular architecture suitable for production

## Getting Started

### Development Server

Run the Next.js development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Storybook

Run Storybook to explore and develop components in isolation:

\`\`\`bash
npm run storybook
\`\`\`

Open [http://localhost:6006](http://localhost:6006) in your browser.

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles with design tokens
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main Kanban board page
├── components/
│   └── KanbanBoard/
│       ├── KanbanBoard.tsx  # Main board component
│       ├── KanbanColumn.tsx # Column component
│       ├── KanbanTask.tsx   # Task card component
│       ├── TaskDialog.tsx   # Task creation/edit dialog
│       └── index.ts         # Barrel exports
├── lib/
│   └── types.ts             # TypeScript type definitions
├── stories/
│   ├── KanbanBoard.stories.tsx
│   ├── KanbanColumn.stories.tsx
│   └── KanbanTask.stories.tsx
└── .storybook/
    ├── main.ts              # Storybook configuration
    └── preview.ts           # Global story settings
\`\`\`

## Component Architecture

### KanbanBoard

The main container component that manages:
- Column state and data
- Drag-and-drop logic
- Task CRUD operations
- Dialog state management

### KanbanColumn

Individual column component featuring:
- Task list rendering
- Drop zone for drag operations
- Add task button
- Task count badge

### KanbanTask

Individual task card with:
- Drag handle for repositioning
- Edit and delete actions
- Hover and drag animations
- Accessible controls

### TaskDialog

Modal dialog for task management:
- Create new tasks
- Edit existing tasks
- Form validation
- Keyboard shortcuts (Cmd/Ctrl + Enter to save)

## Storybook Stories

The project includes comprehensive Storybook stories:

- **KanbanBoard Stories**:
  - Default: Sample board with tasks
  - Empty Board: Clean slate for new projects
  - Many Tasks: Stress test with numerous tasks
  - Dark Mode: Theme showcase

- **Individual Component Stories**:
  - KanbanTask: Various task states
  - KanbanColumn: Empty, populated, and full states

## Technologies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Utility-first styling
- **@hello-pangea/dnd**: Drag and drop
- **shadcn/ui**: Component primitives
- **Storybook 8**: Component development
- **Lucide React**: Icon system

## Deploy

Deploy to Vercel with one click from the v0 interface, or deploy manually:

\`\`\`bash
npm run build
npm run start
\`\`\`

## License

MIT
