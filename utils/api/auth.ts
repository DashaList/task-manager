import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHost } from '@tanstack/react-start/server';
import { getSupabaseServerClient } from '@/server/supabase';

export const signIn = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient();
  const host = getRequestHost();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `http://${host}/auth/callback`,
    },
  });

  if (data.url) {
    throw redirect({ href: data.url });
  }
});

export const getUser = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return { isAuthenticated: false };
  }

  return {
    isAuthenticated: true,
    user: {
      email: data.user.email,
    },
  };
});

export const logOut = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient();

  await supabase.auth.signOut();
});
