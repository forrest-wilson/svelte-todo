<script lang="ts">
  import type { Todo } from '../store'

  export let todo: Todo
</script>

<div class="border rounded mb-2">
  <div class="p-4">
    <p>{todo.text}</p>
  </div>
</div>