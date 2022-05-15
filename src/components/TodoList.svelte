<script lang="ts">
	import { todoItems } from '../store';
	import type { Todo } from '../store';
	import { onDestroy } from 'svelte';
	import TodoItem from './TodoItem.svelte';

	let todos: Todo[];

	const unsub = todoItems.subscribe((val) => (todos = val));

	onDestroy(unsub);
</script>

{#each todos as todo}
	<TodoItem {todo} />
{/each}
