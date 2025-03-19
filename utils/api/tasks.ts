import { getUser } from './auth';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { db } from '@/server/drizzle';
import { tasksTable } from '@/server/drizzle/schema';

export const fetchTasks = createServerFn().handler(async () => {
  const { user } = await getUser();
  const tasks = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.ownerId, user?.id ?? ''));
  return tasks;
});

export const addTask = createServerFn({ method: 'POST' })
  .validator((data: string) => data)
  .handler(async ({ data: text }) => {
    const { user } = await getUser();
    await db.insert(tasksTable).values({ text, ownerId: user?.id });
  });
