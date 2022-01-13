<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
  import { BoardStore } from "./stores";
  import List from "./List.svelte"

  $: columns = Object.values($BoardStore.lists);


  function handleDndColumns(e): void {
    BoardStore.update((state) => {
			return {
				...state,
				lists: e.detail.items
			}
		});
	}
</script>

<section 
	use:dndzone={{items: columns, flipDurationMs: 300, type: 'columns', dropTargetStyle: {}}} 
	on:consider={handleDndColumns} 
	on:finalize={handleDndColumns}
>
	{#each columns as {id, name, cards, isMenuOpened} (id)}    
    <div class="column" animate:flip="{{duration: 300}}">
      <List {id} {name} {cards} {isMenuOpened} />
    </div>
	{/each}
</section>

<style>
	section {
    display: flex;
    gap: 0.25rem;
  }
</style>