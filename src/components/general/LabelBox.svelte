<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let color: string;
  export let selectable: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<div
  class:selectable
  style="--color: {color}; --color-hover: {color}99;"
  on:click={() => dispatch("select")}
>
  <slot />
</div>

<style>
  div {
    line-height: 18px;
    min-height: 20px;
    min-width: 20px;
    max-width: 100%;
    border-radius: 3px;
    background-color: var(--color);
    color: white;
    text-align: center;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 6px 12px;
  }

  .selectable {
    cursor: pointer;
  }

  .selectable:hover {
    background-color: var(--color-hover);
  }
</style>
