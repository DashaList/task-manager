import { Todo } from '../types';
import { getAuthenticatedUser } from './auth';
import { addMockTask, deleteMockTask, editMockTask, getMockTasks, isMockMode } from './mockData';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { db } from '@/server/drizzle';
import { tasksTable } from '@/server/drizzle/schema';

export const fetchTasks = createServerFn().handler(async () => {
  if (isMockMode()) {
    return getMockTasks();
  }

  const user = await getAuthenticatedUser();
  const tasks = await db.select().from(tasksTable).where(eq(tasksTable.ownerId, user.id));

  return tasks.map(({ description, ...task }) => ({
    ...task,
    description: description ?? undefined,
  }));
});

export const addTask = createServerFn({ method: 'POST' })
  .validator((data: Pick<Todo, 'text' | 'description' | 'projectId'>) => data)
  .handler(async ({ data: { text, projectId, description } }) => {
    if (isMockMode()) {
      addMockTask(text, projectId, description);
      return;
    }

    const user = await getAuthenticatedUser();
    await db.insert(tasksTable).values({ text, description, projectId, ownerId: user.id });
  });

export const deleteTask = createServerFn({ method: 'POST' })
  .validator((data: string) => data)
  .handler(async ({ data: id }) => {
    if (isMockMode()) {
      deleteMockTask(id);
      return;
    }

    await getAuthenticatedUser();
    await db.delete(tasksTable).where(eq(tasksTable.id, id));
  });

export const editTask = createServerFn({ method: 'POST' })
  .validator((data: Partial<Todo> & Pick<Todo, 'id'>) => data)
  .handler(async ({ data: { id, ...newTask } }) => {
    if (isMockMode()) {
      editMockTask(id, newTask);
      return;
    }

    await getAuthenticatedUser();
    await db
      .update(tasksTable)
      .set({ ...newTask })
      .where(eq(tasksTable.id, id));
  });
