import { createFileRoute, redirect } from '@tanstack/react-router';
import { TodoListPage } from '@/pages/TodoListPage';

export const Route = createFileRoute('/')({
  component: TodoListPage,
  beforeLoad: async ({ context }) => {
    if (!context.authState.isAuthenticated) {
      throw redirect({ to: '/signin' });
    }
  },
});
