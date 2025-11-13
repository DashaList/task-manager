import { getUser } from './auth';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { db } from '@/server/drizzle';
import { profilesTable } from '@/server/drizzle/schema';

export const getProfile = createServerFn().handler(async () => {
  const { user } = await getUser();

  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.id, user?.id ?? ''));

  return profile;
});
