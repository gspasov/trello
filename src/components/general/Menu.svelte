<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BackArrowButton from "./BackArrowButton.svelte";
  import CloseButton from "./CloseButton.svelte";
  import Divider from "./Divider.svelte";

  export let title: string;
  export let x = 0;
  export let y = 0;
  export let isSubMenu = false;

  const dispatch = createEventDispatcher();
</script>

<div
  class="list-context-menu"
  style="top: {y}px; left: {x}px;"
  draggable={false}
>
  <div class="title-section">
    {#if isSubMenu}
      <BackArrowButton on:click={() => dispatch("back")} />
    {:else}
      <span />
    {/if}
    <span class="title">{title}</span>
    <CloseButton small={true} on:click={() => dispatch("close")} />
  </div>
  <Divider />
  <slot />
</div>

<style>
  .list-context-menu {
    position: absolute;
    background: white;
    width: 250px;
    border-radius: 3px;
    box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
    padding: 5px 0px;
    z-index: 2;
  }

  .title-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
  }

  .title {
    align-self: center;
    line-height: 26px;
    color: #5e6c84;
  }
</style>
