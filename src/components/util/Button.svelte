<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let buttonText: string;

	let cssClasses: string = '';
	export { cssClasses as class };

	const dispatch = createEventDispatcher();
</script>

<button
	class={`bg-fuchsia-700 text-white font-semibold text-sm px-4 py-2 rounded-md ${cssClasses}`}
	on:click={() => dispatch('click')}
>
	{buttonText}
</button>
