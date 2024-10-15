import { db } from '$lib/server/db/index.js';
import { json } from '@sveltejs/kit';
import { todos } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function GET({ requesst }) {
	const { id } = requesst.searchParams;
	if (id) {
		const todo = db.select().from(todos).where({ id }).first();
		return json(todo);
	}

	const allTodos = db.select().from(todos).all();
	return json(allTodos);
}


export async function PATCH({ request, params }) {
	const { id } = params;
	const { title, completed } = await request.json();

	await db.update(todos).set({ title, completed }).where({ id });
	return json({ id });
}

export async function DELETE({ params }) {
	const { id } = params;
	const response = await db.delete(todos).where(eq(todos.id, id)).returning();
	return json(response);
}