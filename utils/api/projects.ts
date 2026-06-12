import { getProfile } from './profile';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { db } from '@/server/drizzle';
import { projectsTable } from '@/server/drizzle/schema';
import { mockProjects, useMocks } from './mockData';

export const getUserProjects = createServerFn().handler(async () => {
  if (useMocks()) {
    return mockProjects;
  }

  const profile = await getProfile();

  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.ownerId, profile?.id ?? ''));

  return projects;
});
