<script lang="ts">
  import Menu from "../../general/Menu.svelte";
  import { createEventDispatcher } from "svelte";
  import { LabelStore } from "../../../stores";
  import type { Label } from "../../../models/label";

  export let x: number;
  export let y: number;
  export let label: Label = undefined;

  const dispatch = createEventDispatcher();

  function handleDelete(): void {
    LabelStore.update((labels) => {
      return labels.filter((l) => l.id !== label.id);
    });
    dispatch("delete");
  }
</script>

<Menu title={"Delete label?"} {x} {y} isSubMenu={true} on:close on:back>
  <div class="container">
    There is no undo. This will remove this label from all cards and destroy its
    history.
    <button class="btn-danger" on:click={handleDelete}>Delete</button>
  </div>
</Menu>

<style>
  .container {
    padding: 0px 12px 8px 12px;
  }

  button {
    width: 100%;
    padding: 6px 12px;
    margin: 10px 0px 0px 0px;
  }
</style>
