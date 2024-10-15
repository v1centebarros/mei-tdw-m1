import { db } from '$lib/server/db';
import { todos } from '$lib/server/db/schema.js';

export async function load() {
	const allTodos = db.select().from(todos).all();
	return {
		todos: allTodos
	}
}
