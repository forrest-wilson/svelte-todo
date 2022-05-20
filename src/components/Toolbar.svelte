<script lang="ts">
	import { todoItems, type Todo } from '../store';
	import { v4 } from 'uuid';

	let addNewTodoDialog = false;
	let newTodo = '';
	let todos: Todo[];

	// Subscribers
	todoItems.subscribe((val) => {
		todos = val;
	});

	// Reactive watchers
	$: if (!addNewTodoDialog) newTodo = '';

	// Methods
	let addTask = () => {
		todoItems.set([...todos, { id: v4(), text: newTodo, isCompleted: false }]);

		addNewTodoDialog = false;
	};
</script>

<div class="flex flex-row mb-4 border-b-2 pb-2">
	<button
		class="rounded-full bg-cyan-500 font-semibold px-4 py-2 shadow-sm text-sm text-white"
		on:click={() => (addNewTodoDialog = true)}
	>
		Add todo
	</button>
</div>

{#if addNewTodoDialog}
	<div
		class="fixed top-0 bottom-0 left-0 right-0 opaque-bg"
		on:click|self={() => (addNewTodoDialog = false)}
	>
		<div class="border rounded bg-white container p-8 absolute pos-center drop-shadow-xl">
			<div class="block pb-4">
				<span class="text-grey-700">Task</span>
				<input bind:value={newTodo} type="text" class="mt-1 block w-full rounded" />
			</div>

			<div class="block">
				<button
					class="rounded bg-cyan-500 font-semibold px-8 py-4 shadow-sm text-sm text-white w-full"
					on:click={addTask}
				>
					Add
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.pos-center {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.opaque-bg {
		background-color: rgba(0, 0, 0, 0.35);
	}
</style>
