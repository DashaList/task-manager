import { createFileRoute } from '@tanstack/react-router';
import { exchangeAuthCode } from '@/utils/api/auth';

// TODO: add redirect to route in next search param, remove errorComponent

export const Route = createFileRoute('/auth/callback')({
  validateSearch: (search: Record<string, unknown>) => ({
    code: (search.code as string) || '',
  }),
  beforeLoad: async ({ search }) => {
    await exchangeAuthCode({ data: search.code });
  },
  component: () => <div>This is auth/callback component</div>,
  errorComponent: () => <div>This is auth/callback ERROR component</div>,
});
