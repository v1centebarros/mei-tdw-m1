<script>
	export let data;
</script>

<h1 class="pt-4 text-center text-5xl font-bold">News</h1>

{#each data.news as news}
	<div class="mx-2 flex items-center justify-between">
		<div class="flex items
		-center gap-x-2">
			<img src={`https://mei-tdw-m1.pockethost.io/${news.image}`} alt={news.title} class="w-20 h-20 object-cover rounded-lg" />
			<span class="text-xl font-light">{news.title}</span>
		</div>
		<span class="text-sm font-light">{news.date}</span>
	</div>
	<div class="mx-2">
		<p>{@html news.content}</p>
	</div>
	<div class="divider"></div>
{/each}