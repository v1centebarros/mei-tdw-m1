<script>
	export let data;
	import { invalidate } from '$app/navigation';


	async function deleteTodo(id) {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'DELETE'
		});
		return res.json();
	}

</script>

<h1 class="text-xl">Todo App</h1>

{#each data.todos as todo}
	<div class="flex items-center justify-between">
		<div class="flex items">
			<input type="checkbox" checked={todo.completed === 1} />
			<span>{todo.title}</span>
		</div>
		<button class="text-red-500"
						on:click={async () => {
							await deleteTodo(todo.id)
							await invalidate('/')
						}}>Delete
		</button>
	</div>
{/each}