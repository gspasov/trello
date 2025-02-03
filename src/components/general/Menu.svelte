<script lang="ts">
  import { Just, Maybe, Nothing } from "@quanterall/lich";

  import { createEventDispatcher } from "svelte";
  import BackArrowButton from "./BackArrowButton.svelte";
  import CloseButton from "./CloseButton.svelte";
  import Divider from "./Divider.svelte";

  export let title: Maybe<string> = Nothing();
  export let isSubMenu = false;
  export let width: string = "250px";
  export let top: Maybe<number> = Nothing();
  export let left: Maybe<number> = Nothing();
  export let right: Maybe<number> = Nothing();
  export let bottom: Maybe<number> = Nothing();

  const dispatch = createEventDispatcher();
</script>

<div
  class="list-context-menu"
  style:width
  style:top={top.map((t) => `${t}px`).otherwise("")}
  style:bottom={bottom.map((t) => `${t}px`).otherwise("")}
  style:left={left.map((t) => `${t}px`).otherwise("")}
  style:right={right.map((t) => `${t}px`).otherwise("")}
>
  <slot name="heading">
    {#if title.isJust()}
      <div class="title-section">
        {#if isSubMenu}
          <BackArrowButton on:click={() => dispatch("back")} />
        {:else}
          <span />
        {/if}
        <span class="title">{title.value}</span>
        <CloseButton small={true} on:click={() => dispatch("close")} />
      </div>
      <Divider />
    {/if}
  </slot>
  <slot name="content" />
</div>

<style>
  :global([slot="content"]) {
    width: 100%;
  }

  .list-context-menu {
    position: absolute;
    background: white;
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
