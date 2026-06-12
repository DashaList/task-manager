import { getUser } from './auth';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { db } from '@/server/drizzle';
import { profilesTable } from '@/server/drizzle/schema';
import { mockProfile, useMocks } from './mockData';

export const getProfile = createServerFn().handler(async () => {
  if (useMocks()) {
    return mockProfile;
  }

  const { user } = await getUser();

  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.id, user?.id ?? ''));

  return profile;
});
