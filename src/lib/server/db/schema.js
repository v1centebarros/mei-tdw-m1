import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	completed: integer('completed').notNull().default(0)
});
