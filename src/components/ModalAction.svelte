<script lang="ts">
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher();
  export let text: string = ""
</script>

<div on:click={() => dispatch("click")}>
  {text}
</div>

<style>
  div {
    background: #e1e1e1;
    padding: 6px 12px;
    line-height: 20px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
  }

  div:hover {
    background: #d5d5d5;
  }
</style>