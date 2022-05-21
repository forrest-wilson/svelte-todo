<script lang="ts">
	import FlexSpacer from './util/FlexSpacer.svelte';
	import { todoItems, type Todo } from '../store';

	export let todo: Todo;

	let todos: Todo[];

	todoItems.subscribe((val) => {
		todos = val;
	});

	let removeTodo = () => {
		let idx = todos.findIndex((val) => todo.id === val.id);
		todos.splice(idx, 1);

		todoItems.set(todos);
	};
</script>

<div
	class="border border-zinc-100 dark:border-zinc-600 rounded-lg shadow-md mb-2 bg-white dark:bg-zinc-800 transition-all"
>
	<div class="p-4 flex items-center">
		<div class="flex-initial">
			<p class="text-zinc-900 dark:text-white ">{todo.text}</p>
		</div>

		<FlexSpacer />

		<div class="flex-initial">
			<button
				class="text-red-500 hover:text-white hover:bg-red-500 rounded-lg px-4 py-2 transition-all"
				on:click={removeTodo}>Remove</button
			>
		</div>
	</div>
</div>
