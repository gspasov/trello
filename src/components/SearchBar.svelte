<script lang="ts">
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

  let value = "";
  let isResultsVisible = false;

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
    isResultsVisible = false;
  }

  function handleChange(): void {
    console.info(value);
    if (value.trim().length > 0) {
      isResultsVisible = true;
    } else {
      isResultsVisible = false;
    }
  }

  function handleBoardClick(board: Board): void {
    addWorkspaceEvent(ChangeSelectedBoardEvent({ boardId: board.id }));
    isResultsVisible = false;
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
  {#if isResultsVisible}
    <div class="results">
      {#if hasResults}
        <ul>
          {#if boards.length > 0}
            <span class="heading"><b>Boards</b></span>
            {#each boards as board}
              <li
                class="result-elem-sizing"
                on:click={() => handleBoardClick(board)}
              >
                <span>{board.name}</span>
              </li>
            {/each}
          {/if}
          {#if boards.length > 0 && lists.length > 0}
            <Divider />
          {/if}
          {#if lists.length > 0}
            <span class="heading"><b>Lists</b></span>
            {#each lists as list}
              <li
                class="result-elem-sizing"
                on:click={() => handleListClick(list)}
              >
                <span>{list.title}</span>
              </li>
            {/each}
          {/if}
          {#if cards.length > 0 && (lists.length > 0 || boards.length > 0)}
            <Divider />
          {/if}
          {#if cards.length > 0}
            <span class="heading"><b>Cards</b></span>
            {#each cards as card}
              <li
                class="result-elem-sizing"
                on:click={() => handleCardClick(card)}
              >
                <span>{card.title}</span>
              </li>
            {/each}
          {/if}
        </ul>
      {:else}
        <span class="result-elem-sizing">No results found..</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  div {
    display: inline-grid;
    align-items: center;
    position: relative;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    cursor: pointer;
  }

  li:hover {
    background-color: #aaaaaa55;
  }

  .results {
    position: absolute;
    top: 120%;
    border-radius: 3px;
    right: 0px;
    z-index: 1;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    padding: 5px 0px;
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .result-elem-sizing {
    width: 32ch;
    padding: 4px 16px;
  }

  .heading {
    padding: 0px 8px;
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
