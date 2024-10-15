<script>
	export let data;

	let inputTodo = '';

	async function deleteTodo(id) {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'DELETE'
		});
		if (res.ok)
			data.todos = data.todos.filter(todo => todo.id !== id);
	}

	async function addTodo(title) {
		const res = await fetch('/api/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title })
		});

		if (res.ok) {
			const newTodo = await res.json();
			data.todos = [...data.todos, newTodo];
			inputTodo = '';
		}
	}

	async function updateTodoStatus(id, completed) {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ completed })
		});

		if (res.ok) {
			const updatedTodo = await res.json();
			console.log(updatedTodo);
			data.todos = data.todos.map(todo => todo.id === id ? updatedTodo : todo);
		}
	}
</script>

<h1 class="text-5xl font-bold text-center pt-4">Todo App</h1>
<div class="divider"></div>
{#if data.todos.length <= 0}
	<p class="text-center text-xl font-bold">Start By Typing your first TODO</p>
{:else}
	<div class="divide-y divide-dashed">
		{#each data.todos as todo}
			<div class="flex items-center justify-between mx-2">
				<div class="flex items-center gap-x-2">
					<input type="checkbox" checked={todo.completed} on:change={(e) => updateTodoStatus(todo.id, e.target.checked)} class="checkbox checkbox-accent" />
					<span class={`font-light text-xl ${todo.completed && "line-through"}`}>{todo.title}</span>
				</div>
				<button class="btn btn-error" on:click={async () => {await deleteTodo(todo.id)}}>Delete</button>
			</div>
		{/each}
	</div>
{/if}

<div class="join m-2">
	<input type="text" class="input input-bordered input-accent join-item w-full" bind:value={inputTodo} />
	<button class={`btn btn-accent join-item ${!inputTodo && 'btn-disabled'}`}
					on:click={async () => {
						await addTodo(inputTodo);
					}}
	>Add Todo
	</button>
</div>