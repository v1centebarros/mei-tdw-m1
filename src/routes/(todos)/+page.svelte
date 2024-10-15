<script>
	export let data;

	let inputTodo = '';

	async function deleteTodo(id) {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'DELETE'
		});
		if (res.ok) data.todos = data.todos.filter((todo) => todo.id !== id);
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
			data.todos = data.todos.map((todo) => (todo.id === id ? updatedTodo : todo));
		}
	}
</script>

<h1 class="pt-4 text-center text-5xl font-bold">Todo App</h1>
<div class="divider"></div>
{#if data.todos.length <= 0}
	<p class="text-center text-xl font-bold">Start By Typing your first TODO</p>
{:else}
	<div class="flex flex-col gap-y-2 divide-y-2 divide-dashed">
		{#each data.todos as todo}
			<div class="mx-2 flex items-center justify-between">
				<div class="flex items-center gap-x-2">
					<input
						type="checkbox"
						checked={todo.completed}
						on:change={(e) => updateTodoStatus(todo.id, e.target.checked)}
						class="checkbox-accent checkbox"
					/>
					<span class={`text-xl font-light ${todo.completed && 'line-through'}`}>{todo.title}</span>
				</div>
				<button
					class="btn btn-error btn-sm"
					on:click={async () => {
						await deleteTodo(todo.id);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						class="bi bi-trash"
						viewBox="0 0 16 16"
					>
						<path
							d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
						/>
						<path
							d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
						/>
					</svg>
				</button>
			</div>
		{/each}
	</div>
{/if}

<div class="join m-2">
	<input
		type="text"
		class="input join-item input-bordered input-accent w-full"
		bind:value={inputTodo}
	/>
	<button
		class={`btn join-item bg-gradient-to-r from-orange-600 from-10% via-pink-800 via-40% to-purple-800 to-90% text-white disabled:text-white ${!inputTodo && 'btn-disabled'}`}
		on:click={async () => {
			await addTodo(inputTodo);
		}}
		>Add Todo
	</button>
</div>
