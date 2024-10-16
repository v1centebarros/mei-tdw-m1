import { render } from '@testing-library/svelte';
import { afterAll, afterEach, beforeAll, beforeEach, expect, test } from 'vitest';

import Page from './+page.svelte';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';

let data;

const server = setupServer(
	http.get('/api/todos', async () => {
		return HttpResponse.json(data);
	}),
	http.post('/api/todos', async ({ request }) => {
		const newTodo = await request.json();
		data.todos = [...data.todos, newTodo];
		return HttpResponse.json(data);
	}),
	http.delete('/api/todos/:id', async ({ params }) => {
		const id = Number(params.id);
		data.todos = data.todos.filter((todo) => todo.id !== id);
		return HttpResponse.json(data);
	}),
	http.patch('/api/todos/:id', async ({ request, params }) => {
		const id = Number(params.id);
		const todo = data.todos.find((todo) => todo.id === id);
		const { completed } = await request.json();
		todo.completed = completed;
		return HttpResponse.json(todo);
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
	data = {
		todos: [
			{ id: 1, title: 'Test Todo 1', completed: false },
			{ id: 2, title: 'Test Todo 2', completed: false }
		]
	};
});

test('renders initial todos correctly', () => {
	const { getByText } = render(Page, { data });
	getByText('Test Todo 1');
	getByText('Test Todo 2');
});

test('displays message when no todos are present', () => {
	data.todos = [];
	const { getByText } = render(Page, { data });
	getByText('Start By Typing your first TODO');
});

test('adds a new todo successfully', async () => {
	const { getByText, getByRole } = render(Page, { data });
	const user = userEvent.setup();
	const input = getByRole('textbox');
	const button = getByText('Add Todo');

	await user.type(input, 'Add new Todo!');
	await user.click(button);

	getByText('Add new Todo!');
});

test('deletes a todo successfully', async () => {
	const { queryByText, getAllByRole } = render(Page, { data });
	const user = userEvent.setup();
	const deleteButton = getAllByRole('button')[0];

	await user.click(deleteButton);

	expect(queryByText('Test Todo 1')).toBeNull();
});

test('updates todo status successfully', async () => {
	const user = userEvent.setup();
	const { getAllByRole } = render(Page, { data });
	const checkbox = getAllByRole('checkbox')[0];

	await user.click(checkbox);

	expect(checkbox.checked).toBe(true);
});
