<script lang="ts">
  import {createEventDispatcher} from "svelte"
  import type * as types from "../types"

  export let label: types.Label;
  export let card: types.Card;

  const dispatch = createEventDispatcher();
</script>

<div class="container">
  <div class="color" style="--color: {label.color}; --color-shadow: {label.color}99;" on:click={() => dispatch("select", { label })}>
    <div class="color-content">
      <span>{label.name ?? ""}</span>
      {#if card.labelIds.includes(label.id)}
        <span>&#10004;</span>
      {/if}
    </div>
  </div>
  <div>
    <div class="pen" on:click={() => dispatch("edit", { label })}>
      <div>
        <span>&#x270F;</span>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    gap: 0.25rem;
    padding-top: 4px;
    justify-content: space-between;
  }

  .color {
    font-size: 14px;
    font-weight: 600;
    color: white;
    min-height: 20px;
    background: var(--color);
    border-radius: 3px;
    flex-grow: 9;
    padding: 6px 12px;
    cursor: pointer;
    transition: padding 85ms,margin 85ms,box-shadow 85ms;
  }

  .color:hover {
    box-shadow: -8px 0 var(--color-shadow);
    margin-left: 8px;
  }

  .color-content {
    display: flex;
    justify-content: space-between;
  }
  .pen {
    display: inline-block;
    margin-right: 20px;
    flex-grow: 1;
    padding: 6px 8px;
    border-radius: 3px;
    cursor: pointer;
    margin: 0;
  }

  .pen:hover {
    background: #eee;
  }
  
  .pen > div {
    transform: rotate(130deg);
  }
</style>

