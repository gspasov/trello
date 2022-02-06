<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CloseButton from "./CloseButton.svelte";
  const dispatch = createEventDispatcher();
  export let title: string = "";
</script>

<div>
  <button class="btn-primary" on:click={() => dispatch("click")}>{title}</button
  >
  <span>
    <CloseButton on:click={() => dispatch("close")} />
  </span>
</div>

<style>
  div {
    display: flex;
    gap: 0.5rem;
  }
  button {
    padding: 4px 10px;
  }

  span {
    align-self: center;
  }
</style>
