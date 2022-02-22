<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    boardColorTypeDarkMapping,
    changeFavorite,
    changeSelected,
  } from "../../models/board";
  import { BoardsStore } from "../../stores";
  import type {
    Coordinates,
    DispatchOpenNewBoardMenu,
  } from "../../supportTypes";
  import MenuItem from "./MenuItem.svelte";

  export let open = false;

  const dispatchOpenNewBoardMenu =
    createEventDispatcher<DispatchOpenNewBoardMenu>();

  $: boards = $BoardsStore;
  $: backgroundColor = boardColorTypeDarkMapping(
    boards.find((b) => b.selected).color.type
  );

  function handleOpenNewBoardMenu(
    event: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement }
  ): void {
    const coordinates: Coordinates = {
      x: event.currentTarget.offsetLeft,
      y: event.currentTarget.offsetTop,
    };
    dispatchOpenNewBoardMenu("openNewBoardMenu", coordinates);
  }

  function handleFavoriteChange(id: string): void {
    changeFavorite(id);
  }

  function handleBoardSelection(boardId: string): void {
    changeSelected(boardId);
  }
</script>

<nav class:open style="background-color: {backgroundColor}">
  <div class="title-section">
    <span class="title">Your Boards</span>
    <span class="btn-add" on:click={handleOpenNewBoardMenu}>&#43;</span>
  </div>
  {#each boards as board (board.id)}
    <MenuItem
      hover={true}
      selected={board.selected}
      on:click={() => handleBoardSelection(board.id)}
    >
      <div class="board-row-item">
        <div>
          <div
            class="board-color-tile"
            style="background-color: {board.color.color}"
          />
          <span class="board-title">{board.name}</span>
        </div>
        <div>
          {#if board.favorite}
            <span
              class="board-star filled"
              on:click|stopPropagation={() => handleFavoriteChange(board.id)}
              >&#x2605;</span
            >
          {:else}
            <span
              class="board-star empty"
              on:click|stopPropagation={() => handleFavoriteChange(board.id)}
              >&#x2606;</span
            >
          {/if}
        </div>
      </div>
    </MenuItem>
  {/each}
</nav>

<style>
  nav {
    height: 100vh;
    width: 0px;
    position: fixed;
    z-index: 2;
    /* margin-top: 45px; */
    top: 45px;
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.3s;
    overflow: hidden;
  }
  .title-section {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
  }
  .title {
    color: whitesmoke;
    font-size: 16px;
    font-weight: 600;
    min-width: 150px;
  }
  .btn-add {
    display: block;
    color: whitesmoke;
    padding: 1px 4px 6px 4px;
    font-size: 24px;
    line-height: 16px;
    align-items: center;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
  }

  .btn-add:hover {
    background-color: #eeeeee44;
  }

  .open {
    width: 250px;
  }

  .board-row-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .board-row-item > div:first-child {
    display: flex;
    align-items: center;
  }

  .board-color-tile {
    min-width: 40px;
    height: 25px;
    border-radius: 3px;
    background-color: black;
  }

  .board-title {
    float: left;
    color: whitesmoke;
    margin-left: 8px;
    min-width: 150px;
  }

  .board-star {
    color: whitesmoke;
    float: right;
    display: block;
    font-size: 20px;
    padding-bottom: 4px;
  }

  .board-star:hover {
    font-size: 24px;
  }
</style>
