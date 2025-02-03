<script lang="ts">
  import { Just } from "@quanterall/lich";
  import { createEventDispatcher } from "svelte";
  import Menu from "../../general/Menu.svelte";

  export let x: number;
  export let y: number;

  const dispatch = createEventDispatcher();
</script>

<Menu title={Just("Move card")} left={Just(x)} top={Just(y)} on:close />

<style>
</style>
