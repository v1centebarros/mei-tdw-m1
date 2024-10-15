import { db } from '$lib/server/db/index.js';
import { json } from '@sveltejs/kit';
import { todos } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function GET({ request }) {
	const { id } = request.searchParams;
	if (id) {
		const todo = db.select().from(todos).where({ id }).first();
		return json(todo);
	}

	const allTodos = db.select().from(todos).all();
	return json(allTodos);
}


export async function PATCH({ request, params }) {
	const { id } = params;
	const { completed } = await request.json();

	const updatedTodo= await db.update(todos).set({  completed: + completed  }).where(eq(todos.id, id)).returning();
	return json({...updatedTodo[0]});
}

export async function DELETE({ params }) {
	const { id } = params;
	const response = await db.delete(todos).where(eq(todos.id, id)).returning();
	return json(response);
}