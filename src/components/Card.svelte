<script lang="ts">
  import { DeleteCardEvent } from "../events";
  import { Card, getLabels } from "../models/card";
  import { addWorkspaceEvent } from "../stores/eventStore";
  import { StateStore } from "../stores/stateStore";

  export let card: Card;
  export let listId: string;
  export let boardId: string;

  let isCloseBtnHidden: boolean = true;
  $: cardLabels = getLabels($StateStore.boards, boardId, listId, card.id);

  function handleDeleteCard(): void {
    addWorkspaceEvent(DeleteCardEvent({ boardId, listId, cardId: card.id }));
  }

  function setCloseBtnVisibility(isVisible: boolean): void {
    isCloseBtnHidden = isVisible;
  }
</script>

<div
  class="card"
  on:mouseleave={() => setCloseBtnVisibility(true)}
  on:mouseenter={() => setCloseBtnVisibility(false)}
>
  {#if !isCloseBtnHidden}
    <i
      class="fa fa-times close"
      aria-hidden="true"
      on:click={handleDeleteCard}
    />
  {/if}
  {#if cardLabels.length > 0}
    <div class="label-wrapper">
      {#each cardLabels as label (label.id)}
        <div class="label" style="--color: {label.color}" />
      {/each}
    </div>
  {/if}
  <div>{card.title}</div>
</div>

<style>
  .card {
    background-color: white;
    min-height: 21px;
    border-radius: 2px;
    padding: 5px 0px 5px 8px;
    box-shadow: 0 1px 0 #091e4240;
    cursor: pointer;
  }

  .card:hover {
    background-color: whitesmoke;
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

  .close {
    position: absolute;
    right: 2px;
    top: 2px;
    color: #999;
    padding: 7px 9px 6px 9px;
  }

  .close:hover {
    background-color: #d2d2d2;
    color: #444;
    border-radius: 4px;
  }
</style>
