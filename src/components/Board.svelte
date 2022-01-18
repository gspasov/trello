<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
  import { BoardStore } from "../stores";
  import List from "./List.svelte"
  import Modal from "./Modal.svelte"
  import type * as types from "../types"
  import CardModal from './CardModal.svelte';

  let modalRef;
  let selectedCard: types.Card;
  $: columns = $BoardStore.lists;
  $: isListMenuOpened = $BoardStore.lists.filter((list) => list.isMenuOpened).length > 0;

  function handleDndColumns(e): void {
    BoardStore.update((state) => {
			return {
				...state,
				lists: e.detail.items
			}
		});
	}

  function handleCardOpen(e: CustomEvent): void {
    selectedCard = columns.find((list) => list.id === e.detail.listId).cards.find((card) => card.id === e.detail.cardId);
    console.info(selectedCard)
    console.info(modalRef)
    modalRef.show();
  }
</script>

<section 
	use:dndzone={{items: columns, flipDurationMs: 300, type: 'columns', dropTargetStyle: {}, dragDisabled: isListMenuOpened}} 
	on:consider={handleDndColumns} 
	on:finalize={handleDndColumns}
>
	{#each columns as {id, name, cards, isMenuOpened} (id)}    
    <div class="column" animate:flip="{{duration: 300}}">
      <List {id} {name} {cards} {isMenuOpened} on:cardOpened={handleCardOpen}/>
    </div>
	{/each}
</section>
<Modal bind:this={modalRef}>
  {#if selectedCard !== undefined}
    <CardModal card={selectedCard}/>
  {/if}
</Modal>


<style>
	section {
    display: flex;
    gap: 0.25rem;
  }
</style>