<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type {
    Coordinates,
    DispatchCompleted,
    DispatchDueDatePosition,
  } from "../../supportTypes";

  export let dueDate: Date;
  export let completed = false;

  $: displayDate = dueDate.toLocaleDateString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  let isDueDateMenuOpen = false;
  const dispatchCompleted = createEventDispatcher<DispatchCompleted>();
  const dipatchDueDateOpen = createEventDispatcher<DispatchDueDatePosition>();

  function toggleComplated(): void {
    completed = !completed;
    dispatchCompleted("toggleCompleted", { completed });
  }

  function toggleOpenDueDateMenu(
    event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
  ): void {
    isDueDateMenuOpen = !isDueDateMenuOpen;
    const coordinates: Coordinates = {
      x: event.currentTarget.offsetLeft,
      y: event.currentTarget.offsetTop,
    };
    dipatchDueDateOpen("openDueDate", coordinates);
  }
</script>

<div class="due-date-section">
  <h5>DueDate</h5>
  <div class="wrapper">
    <input
      type="checkbox"
      bind:checked={completed}
      on:click={toggleComplated}
    />
    <div class="due-date" on:click={toggleOpenDueDateMenu}>
      <span>{displayDate}</span>
      {#if completed}
        <div class="completed">complete</div>
      {/if}
      <span class="arrow">&#x2771;</span>
    </div>
  </div>
</div>

<style>
  input {
    margin: 0;
    cursor: pointer;
  }

  h5 {
    margin: 0px 0px 5px 0px;
    font-size: 12px;
    color: #5e6c84;
  }

  .due-date-section {
    padding: 5px 0px;
  }

  .wrapper {
    align-items: center;
    display: flex;
    gap: 0.5rem;
  }

  .due-date {
    display: flex;
    gap: 0.6rem;
    justify-content: space-between;
    align-items: center;
    background: #091e420a;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
    line-height: 20px;
    font-size: 14px;
    padding: 6px 16px;
  }

  .due-date:hover {
    background: #091e4211;
  }

  .completed {
    height: 16px;
    line-height: 14px;
    background-color: #61bd4f;
    color: white;
    font-size: 12px;
    padding: 0px 4px;
    border-radius: 3px;
  }

  .arrow {
    color: gray;
    transform: rotate(90deg);
  }
</style>
