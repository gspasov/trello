<script lang="ts">
  import {
    DeleteCardEvent,
    MarkCardAsDoneEvent,
    MarkCardAsUndoneEvent,
  } from "../events";
  import { Card, getLabels } from "../models/card";
  import { addWorkspaceEvent } from "../stores/eventStore";
  import { StateStore } from "../stores/stateStore";

  export let card: Card;
  export let listId: string;
  export let boardId: string;

  let dueDateHovered = false;
  let isCloseBtnHidden = true;
  $: isCardCompleted = card.completed;
  $: cardLabels = getLabels($StateStore.boards, boardId, listId, card.id);

  function handleDeleteCard(): void {
    addWorkspaceEvent(DeleteCardEvent({ boardId, listId, cardId: card.id }));
  }

  function setCloseBtnVisibility(isVisible: boolean): void {
    isCloseBtnHidden = isVisible;
  }

  function handleCompleteTask(): void {
    if (isCardCompleted) {
      addWorkspaceEvent(
        MarkCardAsUndoneEvent({ boardId, listId, cardId: card.id })
      );
    } else {
      addWorkspaceEvent(
        MarkCardAsDoneEvent({ boardId, listId, cardId: card.id })
      );
    }
  }
</script>

<div
  class="card"
  on:click
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
  {#if card.dueDate.isJust()}
    <div
      class="due-date"
      class:completed={isCardCompleted}
      on:mouseover={() => (dueDateHovered = true)}
      on:mouseleave={() => (dueDateHovered = false)}
      on:focus={() => (dueDateHovered = true)}
      on:click|stopPropagation={handleCompleteTask}
    >
      {#if dueDateHovered}
        <input type="checkbox" checked={isCardCompleted} />
      {:else}
        <i class="fa fa-clock-o" aria-hidden="true" />
      {/if}
      <span
        >{card.dueDate.value.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}</span
      >
    </div>
  {/if}
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

  .due-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 3.5rem;
    padding: 2px 4px;
    color: #5e6c84;
    border-radius: 3px;
  }

  .due-date.completed {
    background-color: #61bd4f;
    color: white;
  }

  .due-date.completed:hover {
    background-color: #52a242;
  }

  .due-date:hover {
    background-color: #e1e1e1;
  }

  .due-date > i {
    font-size: 1rem;
  }

  .due-date > span {
    font-size: 0.75rem;
  }

  .due-date > input {
    background-color: #e1e1e1;
    cursor: pointer;
  }
</style>
