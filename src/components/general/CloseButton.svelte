<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let small: boolean = false;
</script>

<span class:small on:click={() => dispatch("click")}>&#x2715;</span>

<style>
  span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #999;
    cursor: pointer;
  }

  span:hover {
    color: #555;
  }

  .small {
    font-size: 0.8rem;
  }
</style>
