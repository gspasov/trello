<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
  import { BoardStore } from "../stores";
  import List from "./List.svelte"
  import Modal from "./general/Modal.svelte"
  import CardModal from './card/CardModal.svelte';
  import type { Card } from '../models/card';
  import { List as ListType, updateLists } from '../models/list';
  

  let modalRef: Modal;
  let selectedCard: Card;
  let selectedList: ListType;
  
  $: columns = $BoardStore.lists;
  $: isListMenuOpened = $BoardStore.lists.filter((list) => list.isMenuOpened).length > 0;

  function handleDndColumns(e): void {
    const lists: ListType[] = e.detail.items
    updateLists(lists);
	}

  function handleCardOpen(e: CustomEvent): void {
    selectedList = columns.find((list) => list.id === e.detail.listId)
    selectedCard = selectedList.cards.find((card) => card.id === e.detail.cardId);
    modalRef.show();
  }
</script>

<section 
	use:dndzone={{items: columns, flipDurationMs: 300, type: 'columns', dropTargetStyle: {}, dragDisabled: isListMenuOpened}} 
	on:consider={handleDndColumns} 
	on:finalize={handleDndColumns}
>
	{#each columns as list (list.id)}    
    <div class="column" animate:flip="{{duration: 300}}">
      <List {list} on:cardOpened={handleCardOpen}/>
    </div>
	{/each}
</section>
<Modal bind:this={modalRef} backgroundColor={"#fdfdfd"}>
  <CardModal card={selectedCard} list={selectedList}/>
</Modal>


<style>
	section {
    display: flex;
    gap: 0.25rem;
  }
</style>