<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import List from "./List.svelte";
  import type { List as ListType } from "../models/list";
  import type { Board } from "../models/board";
  import { addWorkspaceEvent } from "../stores/eventStore";
  import { ConsiderMoveListEvent, MoveListEvent } from "../events";

  export let board: Board;

  $: columns = board.lists;
  $: isListMenuOpened =
    board.lists.filter((list) => list.isMenuOpened).length > 0;

  function handleConsiderDndColumns(e): void {
    const lists: ListType[] = e.detail.items;
    addWorkspaceEvent(ConsiderMoveListEvent({ boardId: board.id, lists }));
  }

  function handleDndColumns(e): void {
    const lists: ListType[] = e.detail.items;
    addWorkspaceEvent(MoveListEvent({ boardId: board.id, lists }));
  }
</script>

<section
  use:dndzone={{
    items: columns,
    flipDurationMs: 300,
    type: "columns",
    dropTargetStyle: {},
    dragDisabled: isListMenuOpened,
  }}
  on:consider={handleConsiderDndColumns}
  on:finalize={handleDndColumns}
>
  {#each columns as list (list.id)}
    <div class="column" animate:flip={{ duration: 300 }}>
      <List {list} boardId={board.id} on:cardOpened />
    </div>
  {/each}
</section>

<style>
  section {
    display: flex;
    gap: 0.25rem;
  }
</style>
