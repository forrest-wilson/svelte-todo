<script lang="ts">
	import { modalState } from '../../stores/modalState';

	let isDialogOpen: boolean;

	modalState.subscribe((val: boolean) => {
		isDialogOpen = val;
	});
</script>

{#if isDialogOpen}
	<div
		class="fixed top-0 bottom-0 left-0 right-0 opaque-bg"
		on:click|self={() => modalState.set(false)}
	>
		<div
			class="border rounded bg-white container px-6 py-3 absolute pos-center drop-shadow-xl sm:w-auto md:w-1/3"
		>
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
