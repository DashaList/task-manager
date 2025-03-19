import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { Header } from '@/components/Header';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { addTask as addTaskServerFn, fetchTasks } from '@/utils/api/tasks';

export const Route = createFileRoute('/')({
  component: TodoListPage,
  beforeLoad: async ({ context }) => {
    if (!context.authState.isAuthenticated) {
      throw redirect({ to: '/signin' });
    }
  },
  loader: () => fetchTasks(),
});

function TodoListPage() {
  const router = useRouter();
  const tasks = Route.useLoaderData();
  const addTask = useServerFn(addTaskServerFn);

  const handleAddTask = async (text: string) => {
    await addTask({ data: text });
    router.invalidate();
  };

  const toggleTodo = (_: string) => {};

  const deleteTodo = (_: string) => {};

  return (
    <div className="max-w-2xl mx-auto p-8 pt-16">
      <Header />
      <h1 className="text-[32px] font-bold text-gray-900 mb-8">Frog Task Manager</h1>
      <TodoList
        todos={tasks.filter((todo) => !todo.completed)}
        onToggleItem={toggleTodo}
        onDeleteItem={deleteTodo}
      />
      <TodoInput onAddTodo={handleAddTask} />
      <TodoList
        todos={tasks.filter((todo) => todo.completed)}
        onToggleItem={toggleTodo}
        onDeleteItem={deleteTodo}
      />
    </div>
  );
}
