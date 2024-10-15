import { todos } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db/index.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { title } = await request.json();
	const todo = await db.insert(todos).values({ title }).returning();

	return json({ ...todo[0]}, { status: 201 });
}




