import { db } from '$lib/server/db/index.js';
import { json } from '@sveltejs/kit';
import { todos } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
	const { id } = params;
	if (id) {
		const todo = await db
			.select()
			.from(todos)
			.where(eq(todos.id, Number(id)))
			.limit(1);
		return json(todo);
	}

	const allTodos = await db.select().from(todos).all();
	return json(allTodos);
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PATCH({ request, params }) {
	const { id } = params;
	const { completed } = await request.json();

	const updatedTodo = await db
		.update(todos)
		.set({ completed: +completed }) // + is used to convert boolean to number
		.where(eq(todos.id, Number(id))) // Convert the id to a number
		.returning();
	return json({ ...updatedTodo[0] });
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function DELETE({ params }) {
	const { id } = params;
	const response = await db
		.delete(todos)
		.where(eq(todos.id, Number(id)))
		.returning(); // Convert id to number
	return json(response);
}
