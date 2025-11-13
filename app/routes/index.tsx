import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { Header } from '@/components/Header';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { getProfile } from '@/utils/api/profile';
import { getUserProjects } from '@/utils/api/projects';
import {
  addTask as addTaskServerFn,
  deleteTask as deleteTaskServerfn,
  editTask as editTaskServerFn,
  fetchTasks,
} from '@/utils/api/tasks';
import { Todo } from '@/utils/types';

export const Route = createFileRoute('/')({
  component: TodoListPage,
  beforeLoad: async ({ context }) => {
    if (!context.authState.isAuthenticated) {
      throw redirect({ to: '/signin' });
    }
  },
  loader: async () => {
    const profile = await getProfile();
    const tasks = await fetchTasks();
    const projects = await getUserProjects();

    return { profile, tasks, projects };
  },
});

function TodoListPage() {
  const router = useRouter();
  const tasks = Route.useLoaderData().tasks;

  const addTask = useServerFn(addTaskServerFn);
  const deleteTask = useServerFn(deleteTaskServerfn);
  const editTask = useServerFn(editTaskServerFn);

  const handleAddTask = async (text: string) => {
    await addTask({ data: text });
    router.invalidate();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask({ data: id });
    router.invalidate();
  };

  const handleEditTask = (id: string) => async (newTask: Partial<Todo>) => {
    console.log('handleEdit', newTask);
    await editTask({ data: { id, ...newTask } });
    router.invalidate();
  };

  const toggleTodo = (_: string) => {};

  // TODO: make layout with header

  return (
    <div className="max-w-2xl mx-auto p-8 pt-16">
      <Header />
      <h1 className="text-[32px] font-bold text-gray-900 mb-8">Frog Task Manager</h1>
      <TodoList
        todos={tasks.filter((todo) => !todo.completed)}
        onEditItem={handleEditTask}
        onDeleteItem={handleDeleteTask}
      />
      <TodoInput onAddTodo={handleAddTask} />
      <TodoList
        todos={tasks.filter((todo) => todo.completed)}
        onEditItem={handleEditTask}
        onDeleteItem={handleDeleteTask}
      />
    </div>
  );
}
