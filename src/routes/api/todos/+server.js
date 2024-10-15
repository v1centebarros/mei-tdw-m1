import { todos } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db/index.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { title } = await request.json();
	const [id] = await db.insert(todos).values({ title });

	return json({ id }, { status: 201 });
}

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
	const { title, completed } = await request.json();

	await db.update(todos).set({ title, completed }).where({ id });
	return json({ id });
}

export async function DELETE({ params }) {
	const { id } = params;

	await db.delete(todos).where({ id });
	return json({ id });
}


