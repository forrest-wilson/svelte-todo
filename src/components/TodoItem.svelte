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

<div class="border rounded mb-2">
	<div class="p-4 flex">
		<div class="flex-initial">
			<p class="text-black dark:text-white">{todo.text}</p>
		</div>

		<FlexSpacer />

		<div class="flex-initial">
			<button class="text-red-500" on:click={removeTodo}>Remove</button>
		</div>
	</div>
</div>
