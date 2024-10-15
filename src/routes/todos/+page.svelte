<script>
	export let data;
</script>

<h1 class="text-xl">Todo App</h1>

{#each data.todos as todo}
	<div class="flex items-center justify-between">
		<div class="flex items">
			<input type="checkbox" checked={todo.completed} />
			<span>{todo.title}</span>
		</div>
		<button class="text-red-500">Delete</button>
	</div>
{/each}