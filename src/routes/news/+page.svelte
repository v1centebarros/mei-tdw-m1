<script>
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	export let data;
</script>

<h1 class="pt-4 text-center text-8xl font-bold text-slate-100">News</h1>
<div class="mx-2 flex flex-col items-center justify-between gap-y-2 overflow-y-auto">
	{#each data.news as news}
		<div class="card w-full bg-base-100 shadow-xl">
			<figure>
				<img
					src={`${PUBLIC_POCKETBASE_URL}/${news.collectionId}/${news.id}/${news.image}`}
					alt={news.title}
					class="h-64 w-full object-fill"
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title">{news.title} <span class="text-sm font-light">{news.date}</span></h2>
				<p>{@html news.content}</p>
			</div>
		</div>
	{/each}
</div>
