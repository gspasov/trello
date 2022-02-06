<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let text: string = "";
</script>

<button on:click={() => dispatch("click")}>
  {text}
</button>

<style>
  button {
    width: 100%;
    border: none;
    color: #172b4d;
    background-color: #091e420a;
    padding: 6px 12px;
  }

  button:hover {
    background-color: #091e4211;
  }
</style>
