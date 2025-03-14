import { createFileRoute, redirect } from '@tanstack/react-router';
import { getSupabaseServerClient } from '@/server/supabase';

// TODO: add redirect to route in next search param, remove errorComponent

export const Route = createFileRoute('/auth/callback')({
  validateSearch: (search: Record<string, unknown>) => ({
    code: (search.code as string) || '',
  }),
  beforeLoad: async ({ search }) => {
    const code = search.code;

    if (code) {
      const supabase = getSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        throw redirect({ to: `/` });
      }
    }
  },
  component: () => <div>This is auth/callback component</div>,
  errorComponent: () => <div>This is auth/callback ERROR component</div>,
});
