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

	let dragStart = (e: DragEvent) => {
		if (!e.dataTransfer) {
			return;
		}

		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer?.setData('id', todo.id);
	};

	let dragOver = (e: DragEvent) => {
		e.preventDefault();
	};

	let drop = (e: DragEvent) => {
		const toIdx = todos.findIndex((t) => t.id === todo.id);
		const fromIdx = todos.findIndex((t) => t.id === e.dataTransfer?.getData('id'));

		const el = todos.splice(fromIdx, 1)[0];

		todos.splice(toIdx, 0, el);

		todoItems.set(todos);
	};
</script>

<div
	class="border border-zinc-100 dark:border-zinc-600 rounded-md shadow-md mb-2 bg-white dark:bg-zinc-800 transition hover:bg-fuchsia-700 group cursor-pointer hover:scale-[1.02] item"
	draggable="true"
	on:dragstart={dragStart}
	on:dragover={dragOver}
	on:drop={drop}
>
	<div class="p-4 flex items-center">
		<div class="flex-initial">
			<p class="text-gray-700 dark:text-white group-hover:text-white font-medium transition">
				{todo.text}
			</p>
		</div>

		<FlexSpacer />

		<div class="flex-initial">
			<button
				class="text-red-500 hover:text-white hover:bg-red-500 rounded-md px-4 py-2 transition group-hover:text-white"
				on:click={removeTodo}
			>
				<i class="gg-trash" />
			</button>
		</div>
	</div>
</div>

<style>
	.item {
		user-select: none;
	}
</style>
