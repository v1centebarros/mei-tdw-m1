import { pb } from '$lib/server/pocketbase/index.js';

/** @type {import('@sveltejs/kit').Load} */
export async function load() {
	const records = await pb.collection('News').getFullList({
		sort: '-created',
	});
	return {
		news: records
	};
}