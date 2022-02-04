<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let text: string = "";
</script>

<div on:click={() => dispatch("click")}>
  {text}
</div>

<style>
  div {
    background: #091e420a;
    padding: 6px 12px;
    line-height: 20px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
  }

  div:hover {
    background: #091e4211;
  }
</style>
