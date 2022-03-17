<script lang="ts">
  import { Just } from "@quanterall/lich";
  import { ChangeSelectedBoardEvent } from "../events";
  import type { Board } from "../models/board";
  import type { Card } from "../models/card";
  import type { List } from "../models/list";
  import { addWorkspaceEvent } from "../stores/eventStore";
  import {
    findBoards,
    findCards,
    findLists,
    searchIndex,
    SearchIndexStore,
  } from "../stores/searchStore";
  import { StateStore } from "../stores/stateStore";
  import Divider from "./general/Divider.svelte";
  import Menu from "./general/Menu.svelte";
  import MenuItem from "./general/MenuItem.svelte";

  let value = "";
  let areResultsVisible = false;

  $: boards = findBoards(
    $StateStore.boards,
    searchIndex(value, $SearchIndexStore.board)
  );
  $: lists = findLists(
    $StateStore.boards,
    searchIndex(value, $SearchIndexStore.list)
  );
  $: cards = findCards(
    $StateStore.boards,
    searchIndex(value, $SearchIndexStore.card)
  );

  $: hasResults = boards.length > 0 || lists.length > 0 || cards.length > 0;

  function handleClear(): void {
    value = "";
    areResultsVisible = false;
  }

  function handleChange(): void {
    console.info(value);
    if (value.trim().length > 0) {
      areResultsVisible = true;
    } else {
      areResultsVisible = false;
    }
  }

  function handleBoardClick(board: Board): void {
    addWorkspaceEvent(ChangeSelectedBoardEvent({ boardId: board.id }));
    areResultsVisible = false;
    value = "";
  }
  function handleListClick(list: List): void {}
  function handleCardClick(card: Card): void {}
</script>

<div>
  <i class="fa fa-search search" />
  <input
    type="text"
    bind:value
    placeholder="Search..."
    on:input={handleChange}
  />
  {#if value.trim().length > 0}
    <button aria-label="Clear" title="Clear" on:click={handleClear}>
      <i class="fa fa-close close" />
    </button>
  {/if}
  {#if areResultsVisible}
    <Menu top={Just(40)} right={Just(0)} width={"32ch"}>
      <div slot="content">
        {#if hasResults}
          {#if boards.length > 0}
            <span class="heading">Boards</span>
            {#each boards as board}
              <MenuItem
                lineText={board.name}
                hover={true}
                on:click={() => handleBoardClick(board)}
              />
            {/each}
          {/if}
          {#if boards.length > 0 && lists.length > 0}
            <Divider />
          {/if}
          {#if lists.length > 0}
            <span class="heading">Lists</span>
            {#each lists as list}
              <MenuItem
                lineText={list.title}
                hover={true}
                on:click={() => handleListClick(list)}
              />
            {/each}
          {/if}
          {#if cards.length > 0 && (lists.length > 0 || boards.length > 0)}
            <Divider />
          {/if}
          {#if cards.length > 0}
            <span class="heading">Cards</span>
            {#each cards as card}
              <MenuItem
                lineText={card.title}
                hover={true}
                on:click={() => handleCardClick(card)}
              />
            {/each}
          {/if}
        {:else}
          <span class="result-elem-sizing">No results found..</span>
        {/if}
      </div>
    </Menu>
  {/if}
</div>

<style>
  div {
    display: inline-grid;
    align-items: center;
    position: relative;
  }

  .result-elem-sizing {
    width: 32ch;
    padding: 4px 16px;
  }

  .heading {
    padding: 0px 8px;
    font-weight: bold;
  }

  input {
    height: 30px;
    width: 220px;
    padding-right: 25px;
    padding-left: 30px;
    background-color: #eeeeee50;
    color: antiquewhite;
  }

  input::placeholder {
    color: #faebd7cc;
  }

  button {
    right: 8px;
    position: absolute;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0px 5px 1px 4px;
  }

  i {
    color: antiquewhite;
  }

  i.close:hover {
    color: white;
  }

  i.search {
    position: absolute;
    left: 8px;
  }
</style>
