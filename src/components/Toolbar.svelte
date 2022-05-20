<script lang="ts">
	import { todoItems, type Todo } from '../store';
	import { v4 } from 'uuid';
	import Button from './util/Button.svelte';
	import FlexSpacer from './util/FlexSpacer.svelte';
	import { appState } from '../stores/appState';
	import RoundedSwitch from './util/RoundedSwitch.svelte';

	let addNewTodoDialog = false;
	let newTodo = '';
	let todos: Todo[];
	let darkMode: boolean;

	// Subscribers
	todoItems.subscribe((val) => {
		todos = val;
	});

	appState.subscribe((val) => {
		darkMode = val.darkMode;
	});

	// Reactive watchers
	$: if (!addNewTodoDialog) newTodo = '';
	$: appState.set({ darkMode });

	// Methods
	let addTask = () => {
		todoItems.set([...todos, { id: v4(), text: newTodo, isCompleted: false }]);

		addNewTodoDialog = false;
	};

	let handleEnter = (keypress: KeyboardEvent) => {
		switch (keypress.key) {
			case 'Enter':
				addTask();
				break;
			case 'Escape':
				addNewTodoDialog = false;
				break;
			case 'a':
				if (keypress.metaKey) {
					addNewTodoDialog = true;
				}
				break;
		}
	};

	let handleCheck = (evt: CustomEvent) => {
		darkMode = evt.detail;
	};
</script>

<svelte:window on:keydown={handleEnter} />

<div class="flex flex-row mb-4 border-b-2 pt-4 pb-2 items-center">
	<Button buttonText="Add Todo" on:click={() => (addNewTodoDialog = true)} class="mr-2" />

	<div class="text-purple-500"><b>⌘A</b></div>

	<FlexSpacer />

	<!-- <input bind:value={darkMode} bind:checked={darkMode} type="checkbox" /> -->

	<RoundedSwitch state={darkMode} on:checked={handleCheck} />
</div>

{#if addNewTodoDialog}
	<div
		class="fixed top-0 bottom-0 left-0 right-0 opaque-bg"
		on:click|self={() => (addNewTodoDialog = false)}
	>
		<div
			class="border rounded bg-white container px-6 py-3 absolute pos-center drop-shadow-xl sm:w-auto md:w-1/3"
		>
			<div class="flex">
				<FlexSpacer />
				<button on:click={() => (addNewTodoDialog = false)}>x</button>
			</div>

			<div class="block pb-4">
				<span class="text-grey-700">Task</span>
				<!-- svelte-ignore a11y-autofocus -->
				<input
					on:keyup={handleEnter}
					bind:value={newTodo}
					placeholder="Enter todo"
					type="text"
					class="mt-1 block w-full rounded"
					autofocus
				/>
			</div>

			<div class="block">
				<Button buttonText="Add" class="w-full" on:click={addTask} />
			</div>

			<div class="block p-2 text-center text-gray-500 font-extralight">
				<span>Press Enter to add</span>
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
