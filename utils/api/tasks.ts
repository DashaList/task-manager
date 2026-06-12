import { Todo } from '../types';
import { getUser } from './auth';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { db } from '@/server/drizzle';
import { tasksTable } from '@/server/drizzle/schema';
import { addMockTask, deleteMockTask, editMockTask, getMockTasks, useMocks } from './mockData';

export const fetchTasks = createServerFn().handler(async () => {
  if (useMocks()) {
    return getMockTasks();
  }

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
    if (useMocks()) {
      addMockTask(text);
      return;
    }

    const { user } = await getUser();
    await db.insert(tasksTable).values({ text, ownerId: user?.id });
  });

export const deleteTask = createServerFn({ method: 'POST' })
  .validator((data: string) => data)
  .handler(async ({ data: id }) => {
    if (useMocks()) {
      deleteMockTask(id);
      return;
    }

    const { user } = await getUser();
    await db.delete(tasksTable).where(eq(tasksTable.id, id));
  });

export const editTask = createServerFn({ method: 'POST' })
  .validator((data: Partial<Todo> & Pick<Todo, 'id'>) => data)
  .handler(async ({ data: { id, ...newTask } }) => {
    if (useMocks()) {
      editMockTask(id, newTask);
      return;
    }

    const { user } = await getUser();
    await db
      .update(tasksTable)
      .set({ ...newTask })
      .where(eq(tasksTable.id, id));
  });
