<script lang="ts">
  import { BoardStore, LabelStore } from "../stores";
  import CloseButton from "./CloseButton.svelte";
  import type * as types from "../types";

  export let card: types.Card; 
  export let listId: string

  let isCloseBtnHidden: boolean = true;
  $: cardLabels = $LabelStore.filter((l) => card.labelIds.includes(l.id));

  function deleteCard(): void {
    BoardStore.update((state) => {
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id !== listId) return list;
          return {
            ...list,
            cards: list.cards.filter((c) => c.id !== card.id),
          };
        }),
      }
    });
  }

  function setCloseBtnVisibility(isVisible: boolean): void {
    isCloseBtnHidden = isVisible;
  }

</script>

<div class="card" on:mouseleave={() => setCloseBtnVisibility(true)} on:mouseenter={() => setCloseBtnVisibility(false)}>
  {#if !isCloseBtnHidden}
    <div class="close-parent">
      <span class="close" on:click={deleteCard} >
        <CloseButton small={true} />
      </span>
    </div>
  {/if}
  {#if cardLabels.length > 0}
    <div class="label-wrapper">
      {#each cardLabels as label (label.id)}
        <div class="label" style="--color: {label.color}"></div>
      {/each}
    </div>
  {/if}
  <div class="title">{card.title}</div>
</div>

<style>
  .card {
		background-color: white;
    min-height: 20px;
		border-radius: 2px;
		padding: 5px 0px 5px 8px;
		box-shadow: 0 1px 0 #091e4240;
    font-size: 14px;
    cursor: pointer;
	}
  
  .card:hover {
    background-color: whitesmoke;
  }
  
  .title {
    line-height: 20px;
  }

  .label-wrapper {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
    max-width: 90%;
    margin-bottom: 4px;
  }
  .label {
    background-color: var(--color);
    height: 8px;
    width: 30px;
    border-radius: 3px;
  }

  .close-parent {
    position: absolute;
    right: 2px;
  }

  .close {
    color: #999;
    padding: 3px 9px 4px 9px;
  }

  .close:hover {
    background-color: #d2d2d2;
    color: #444;
    border-radius: 4px;
  }
</style>