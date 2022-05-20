import { writable } from 'svelte/store';
import { browser } from '$app/env';

const localStorageKey = 'todoItems';

export type Todo = {
	id: string;
	text: string;
	isCompleted: boolean;
};

const todos: Todo[] = [];

export const todoItems = writable(todos);

if (browser) {
	todoItems.set(JSON.parse(localStorage.getItem(localStorageKey) || JSON.stringify([])));

	todoItems.subscribe((val) => {
		localStorage.setItem(localStorageKey, JSON.stringify(val));
	});
}
