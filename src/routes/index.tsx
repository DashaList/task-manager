import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { AppSidebar } from '@/components/AppSidebar';
import { profileQueryOptions } from '@/utils/queries/profile';
import { projectsQueryOptions } from '@/utils/queries/projects';
import { tasksQueryOptions } from '@/utils/queries/tasks';
import { AddTodoControl } from '@components/AddTodoControl';
import { Header } from '@components/Header';
import { TodoList } from '@components/TodoList';

export const Route = createFileRoute('/')({
  component: TodoListPage,
  beforeLoad: async ({ context }) => {
    if (!context.authState.isAuthenticated) {
      throw redirect({ to: '/signin' });
    }
  },
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(profileQueryOptions());
    context.queryClient.ensureQueryData(projectsQueryOptions());
    await context.queryClient.ensureQueryData(tasksQueryOptions());
  },
});

function TodoListPage() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions());
  const [editingTaskId, setEditingTaskId] = useState<string>();
  const { data: projects } = useSuspenseQuery(projectsQueryOptions());

  const [activeProjectId, setActiveProjectId] = useState<string>();

  // TODO: make layout with header

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar
        projects={projects}
        activeProjectId={activeProjectId}
        onAddTask={() => {}}
        onSelectProject={(id) => setActiveProjectId(id)}
      />
      <main className="flex flex-1 justify-center">
        <div className="w-full max-w-2xl p-8 pt-16">
          <Header />
          <h1 className="text-[32px] font-bold text-gray-900 mb-8">Frog Task Manager</h1>
          <TodoList
            todos={tasks.filter((todo) => !todo.completed)}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
          />
          <AddTodoControl editingTaskId={editingTaskId} setEditingTaskId={setEditingTaskId} />
          <TodoList
            todos={tasks.filter((todo) => todo.completed)}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
          />
        </div>
      </main>
    </div>
  );
}
