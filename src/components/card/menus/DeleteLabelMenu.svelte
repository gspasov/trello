<script lang="ts">
  import Menu from "../../general/Menu.svelte";
  import { createEventDispatcher } from "svelte";
  import type { Label } from "../../../models/label";
  import { addWorkspaceEvent } from "../../../stores/eventStore";
  import { DeleteLabelEvent } from "../../../events";
  import { Just } from "@quanterall/lich";

  export let x: number;
  export let y: number;
  export let label: Label;
  export let boardId: string;

  const dispatch = createEventDispatcher();

  function handleDelete(): void {
    addWorkspaceEvent(DeleteLabelEvent({ boardId, labelId: label.id }));
    dispatch("delete");
  }
</script>

<Menu
  title={Just("Delete label?")}
  left={Just(x)}
  top={Just(y)}
  isSubMenu={true}
  on:close
  on:back
>
  <div class="container" slot="content">
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
