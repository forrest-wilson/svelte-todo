<script lang="ts">
	import { todoItems, type Todo } from '../store';
	import { v4 } from 'uuid';
	import Button from './util/Button.svelte';
	import FlexSpacer from './util/FlexSpacer.svelte';
	import { appState } from '../stores/appState';
	import RoundedSwitch from './util/RoundedSwitch.svelte';

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
	$: appState.set({ darkMode });

	// Methods
	const addTask = () => {
		todoItems.set([...todos, { id: v4(), text: newTodo, isCompleted: false }]);

		newTodo = '';
	};

	const handleKeypress = (keypress: KeyboardEvent) => {
		switch (keypress.key) {
			case 'Enter':
				addTask();
				break;
		}
	};

	const handleCheck = (evt: CustomEvent) => {
		darkMode = evt.detail;
	};
</script>

<div class="flex pb-2 items-center">
	<FlexSpacer />

	<RoundedSwitch state={darkMode} on:checked={handleCheck} />
</div>

<div class="flex mb-4 items-center relative">
	<!-- svelte-ignore a11y-autofocus -->
	<input
		on:keyup={handleKeypress}
		bind:value={newTodo}
		placeholder="Enter todo"
		type="text"
		class="mr-2 w-full rounded-md border-zinc-100 dark:border-zinc-600 shadow-md p-4 flex-1"
		autofocus
	/>

	<Button buttonText="Add Todo" on:click={addTask} class="shadow-md" />
</div>
