import { sql } from 'drizzle-orm';
import {
  pgTable,
  foreignKey,
  pgPolicy,
  uuid,
  timestamp,
  text,
  boolean,
  pgSchema,
} from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

const usersTable = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const tasksTable = pgTable(
  'tasks',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    ownerId: uuid('owner_id')
      .default(sql`auth.uid()`)
      .notNull(),
    text: text().default('').notNull(),
    completed: boolean().default(false).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.ownerId],
      foreignColumns: [usersTable.id],
      name: 'tasks_owner_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    pgPolicy('Enable insert for authenticated users only', {
      as: 'permissive',
      for: 'insert',
      to: ['authenticated'],
      withCheck: sql`true`,
    }),
    pgPolicy('Enable users to view their own data only', {
      as: 'permissive',
      for: 'select',
      to: ['authenticated'],
    }),
    pgPolicy('Enable delete for users based on user_id', {
      as: 'permissive',
      for: 'delete',
      to: ['authenticated'],
    }),
    pgPolicy('Enable update for users based on user_id', {
      as: 'permissive',
      for: 'update',
      to: ['authenticated'],
    }),
  ],
);

export const projectsTable = pgTable(
  'projects',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    name: text().notNull(),
    ownerId: uuid('owner_id')
      .default(sql`auth.uid()`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.ownerId],
      foreignColumns: [usersTable.id],
      name: 'projects_owner_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const profilesTable = pgTable(
  'profiles',
  {
    id: uuid()
      .default(sql`auth.uid()`)
      .primaryKey()
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    defaultProjectId: uuid('default_project_id').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [usersTable.id],
      name: 'profiles_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);
