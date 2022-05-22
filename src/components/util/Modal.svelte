<script lang="ts">
	import { modalState } from '../../stores/modalState';

	let isDialogOpen: boolean;

	modalState.subscribe((val: boolean) => {
		isDialogOpen = val;
	});
</script>

{#if isDialogOpen}
	<div
		class="fixed top-0 left-0 w-screen h-screen w-screen opaque-bg flex items-center justify-center z-index"
		on:click|self={() => modalState.set(false)}
	>
		<div class="mx-4 flex-1 container-max-w">
			<div class="border rounded-md bg-white container px-6 py-3 drop-shadow-xl">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	.opaque-bg {
		background-color: rgba(0, 0, 0, 0.35);
	}

	.z-index {
		z-index: 1000;
	}
</style>
