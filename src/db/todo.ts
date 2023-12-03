import { eq } from 'drizzle-orm';
import { db } from '.';
import { Todo } from '../types';
import { todoTable } from './schema';

export async function getAllTodos() {
    return await db.select().from(todoTable);
}

export async function getTodo(id: number) {
    return (await db.select().from(todoTable).where(eq(todoTable.id, id)))[0];
}

export async function createTodo(body: Pick<Todo, 'name'>) {
    return db.insert(todoTable).values(body).returning();
}

export async function toggleCompleteTodo(id: number) {
    const todo = await getTodo(id);
    return db
        .update(todoTable)
        .set({ completed: !todo.completed })
        .where(eq(todoTable.id, id))
        .returning({ todo: todoTable });
}

export async function updateTodo(id: number, name: string) {
    return db
        .update(todoTable)
        .set({ name })
        .where(eq(todoTable.id, id))
        .returning({ todo: todoTable });
}

export async function deleteTodo(id: number) {
    return db.delete(todoTable).where(eq(todoTable.id, id)).returning();
}
