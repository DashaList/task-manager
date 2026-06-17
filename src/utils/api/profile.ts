import { getAuthenticatedUser } from './auth';
import { mockProfile, isMockMode } from './mockData';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { db } from '@/server/drizzle';
import { profilesTable } from '@/server/drizzle/schema';

export const getProfile = createServerFn().handler(async () => {
  if (isMockMode()) {
    return mockProfile;
  }

  const user = await getAuthenticatedUser();

  const [profile] = await db.select().from(profilesTable).where(eq(profilesTable.id, user.id));

  return profile;
});
