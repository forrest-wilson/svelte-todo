<script lang="ts">
	import Toolbar from '../components/Toolbar.svelte';
	import TodoList from '../components/TodoList.svelte';
</script>

<div class="container p-4 mx-auto container-max-w">
	<Toolbar />

	<hr class="my-4 rounded" />

	<TodoList />
</div>

<style>
	hr {
		margin: 10px;
	}
</style>
