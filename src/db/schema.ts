import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todos', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    completed: integer('completed', { mode: 'boolean' }).default(false),
    createdDate: text('created_date').default(sql`CURRENT_TIMESTAMP`),
    updatedDate: text('updated_date').default(sql`CURRENT_TIMESTAMP`),
});
