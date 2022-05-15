import { writable } from 'svelte/store';

export type Todo = {
	id: string;
	text: string;
	isCompleted: boolean;
};

const todos: Todo[] = [];

for (let i = 0; i < 5; i++) {
	todos.push({
		id: `${i + 1}`,
		text: `Todo number ${i + 1}`,
		isCompleted: false
	});
}

export const todoItems = writable(todos);
