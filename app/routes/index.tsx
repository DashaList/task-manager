import { createFileRoute } from '@tanstack/react-router';
import { TodoListPage } from '@/pages/TodoListPage';

export const Route = createFileRoute('/')({
  component: TodoListPage,
});
