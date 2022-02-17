<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import List from "./List.svelte";
  import { List as ListType, updateLists } from "../models/list";
  import type { Board } from "../models/board";

  export let board: Board;

  $: columns = board.lists;
  $: isListMenuOpened =
    board.lists.filter((list) => list.isMenuOpened).length > 0;

  function handleDndColumns(e): void {
    const lists: ListType[] = e.detail.items;
    updateLists(board.id, lists);
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
  on:consider={handleDndColumns}
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
