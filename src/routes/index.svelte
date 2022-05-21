<script lang="ts">
	import Toolbar from '../components/Toolbar.svelte';
	import TodoList from '../components/TodoList.svelte';
</script>

<div class="container p-4 mx-auto main-container h-screen">
	<Toolbar />
	<TodoList />
</div>

<style>
	.main-container {
		max-width: 600px;
	}
</style>
