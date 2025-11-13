import { getProfile } from './profile';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { db } from '@/server/drizzle';
import { projectsTable } from '@/server/drizzle/schema';

export const getUserProjects = createServerFn().handler(async () => {
  const profile = await getProfile();

  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.ownerId, profile?.id ?? ''));

  return projects;
});
