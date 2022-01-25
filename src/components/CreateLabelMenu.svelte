<script lang="ts">
  import Menu from "./Menu.svelte"
  import {createEventDispatcher} from "svelte"

  export let x: number;
  export let y: number;
  const dispatch = createEventDispatcher();
</script>

<Menu title={"Change label"} {x} {y} isSubMenu={true} on:close={() => dispatch("close")} on:back={() => dispatch("back")}>
  EMPTY
</Menu>
