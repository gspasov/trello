<script lang="ts">
  import { LabelStore } from "../stores";
  import CloseButton from "./general/CloseButton.svelte";
  import { Card, deleteCard } from "../models/card";

  export let card: Card;
  export let listId: string;

  let isCloseBtnHidden: boolean = true;
  $: cardLabels = $LabelStore.filter((l) => card.labelIds.includes(l.id));

  function handleDeleteCard(): void {
    deleteCard(card.id, listId);
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
    <div class="close-parent">
      <span class="close" on:click={handleDeleteCard}>
        <CloseButton small={true} />
      </span>
    </div>
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
    min-height: 20px;
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
