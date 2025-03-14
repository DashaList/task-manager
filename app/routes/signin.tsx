import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignIn } from '@/pages/SignIn';

export const Route = createFileRoute('/signin')({
  component: SignIn,
  beforeLoad: async ({ context }) => {
    if (context.authState.isAuthenticated) {
      throw redirect({ to: "/" })
    }
  },
});
