import type { ReactNode } from 'react';
import globalscss from '~/styles/globals.css?url';
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { getUser } from '@/utils/api/auth';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Task Manager',
      },
    ],
    links: [{ rel: 'stylesheet', href: globalscss }],
  }),
  beforeLoad: async () => {
    const authState = await getUser();

    return { authState };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
