<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<span on:click={() => dispatch("click")}>&#10132;</span>

<style>
  span {
    transform: rotate(180deg);
    color: gray;
    cursor: pointer;
    padding-bottom: 2px;
  }
</style>
