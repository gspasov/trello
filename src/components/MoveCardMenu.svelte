<script lang="ts">
  import {createEventDispatcher} from "svelte"
  import Menu from "./Menu.svelte"

  export let x: number;
  export let y: number;

  const dispatch = createEventDispatcher();
</script>

<Menu title={"Move card"} {x} {y} on:close>
</Menu>

<style>

</style>