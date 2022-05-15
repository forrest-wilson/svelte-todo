<script lang="ts">
	let addNewTodoDialog = false;

	let toggleDialog = () => (addNewTodoDialog = !addNewTodoDialog);
</script>

<div class="flex flex-row mb-4 border-b-2 pb-2">
	<button
		class="rounded-full bg-cyan-500 font-semibold px-4 py-2 shadow-sm text-sm text-white"
		on:click={toggleDialog}
	>
		Add todo
	</button>
</div>

{#if addNewTodoDialog}
	<div class="fixed top-0 bottom-0 left-0 right-0 opaque-bg" on:click={toggleDialog}>
		<div class="border rounded bg-white container p-4 absolute pos-center drop-shadow-xl">
			<slot />
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
