<script>
  import { onMount } from 'svelte';

  let todos = [];
  let newTodo = '';


  async function loadTodos() {
    const response = await fetch('/api/todos');
    todos = await response.json();
  }

  async function addTodo() {
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: newTodo }),
    });
    newTodo = '';
    await loadTodos();
  }


  async function toggleComplete(todo) {
    await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todo.completed }),
    });
    await loadTodos();
  }

  onMount(() => {
    loadTodos();
  });
</script>


<h1>TODO APP</h1>
<input bind:value={newTodo} placeholder="New Todo" />
<button on:click={addTodo}>Add Todo</button>

<ul>
  {#each todos as todo}
    <li>
      <input type="checkbox" checked={todo.completed} on:click={() => toggleComplete(todo)} />
      {todo.title}
    </li>
  {/each}
</ul>