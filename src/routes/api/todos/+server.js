import { todos } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db/index.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { title } = await request.json();
	const [id] = await db.insert(todos).values({ title });

	return json({ id }, { status: 201 });
}




