<script lang="ts">
	import { todoItems, type Todo } from '../store';
	import { v4 } from 'uuid';
	import Button from './util/Button.svelte';
	import FlexSpacer from './util/FlexSpacer.svelte';
	import { appState } from '../stores/appState';
	import RoundedSwitch from './util/RoundedSwitch.svelte';
	import Modal from './util/Modal.svelte';
	import { modalState } from '../stores/modalState';

	let newTodo = '';
	let todos: Todo[];
	let darkMode: boolean;
	let dialog: boolean;

	// Subscribers
	todoItems.subscribe((val) => {
		todos = val;
	});

	appState.subscribe((val) => {
		darkMode = val.darkMode;
	});

	modalState.subscribe((val) => {
		dialog = val;
	});

	// Reactive watchers
	$: if (!dialog) newTodo = '';
	$: appState.set({ darkMode });

	// Methods
	const addTask = () => {
		todoItems.set([...todos, { id: v4(), text: newTodo, isCompleted: false }]);

		setModalState(false);
	};

	const handleKeypress = (keypress: KeyboardEvent) => {
		switch (keypress.key) {
			case 'Enter':
				addTask();
				break;
			case 'Escape':
				setModalState(false);
				break;
			case 'a':
				if (!dialog) {
					keypress.preventDefault();
					setModalState(true);
				}

				break;
		}
	};

	const handleCheck = (evt: CustomEvent) => {
		darkMode = evt.detail;
	};

	const setModalState = (state: boolean) => {
		modalState.set(state);
	};
</script>

<svelte:window on:keydown={handleKeypress} />

<div class="flex flex-row mb-4 border-b-2 pb-2 items-center">
	<Button
		buttonText="Add Todo"
		on:click={() => setModalState(true)}
		class="mr-2 shadow-md transition"
	/>

	<div class="text-purple-500"><b>Press A</b></div>

	<FlexSpacer />

	<RoundedSwitch state={darkMode} on:checked={handleCheck} />
</div>

<Modal>
	<div class="flex">
		<FlexSpacer />
		<button on:click={() => setModalState(false)}>x</button>
	</div>

	<div class="pb-4">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			on:keyup={handleKeypress}
			bind:value={newTodo}
			placeholder="Enter todo"
			type="text"
			class="mt-1 block w-full rounded-md"
			autofocus
		/>
	</div>

	<Button buttonText="Add" class="w-full" on:click={addTask} />

	<div class="block p-2 text-center text-gray-700 font-light text-sm">
		<span>Press Enter to add</span>
	</div>
</Modal>
