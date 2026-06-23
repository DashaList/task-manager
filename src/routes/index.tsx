import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getProfile } from '@/utils/api/profile';
import { getUserProjects } from '@/utils/api/projects';
import { fetchTasks } from '@/utils/api/tasks';
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
    await context.queryClient.ensureQueryData(tasksQueryOptions());
    const profile = await getProfile();
    const projects = await getUserProjects();

    return { profile, projects };
  },
});

function TodoListPage() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions());

  // TODO: make layout with header

  return (
    <div className="max-w-2xl mx-auto p-8 pt-16">
      <Header />
      <h1 className="text-[32px] font-bold text-gray-900 mb-8">Frog Task Manager</h1>
      <TodoList todos={tasks.filter((todo) => !todo.completed)} />
      <AddTodoControl />
      <TodoList todos={tasks.filter((todo) => todo.completed)} />
    </div>
  );
}
