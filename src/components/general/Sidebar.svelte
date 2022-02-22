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
    <i
      class="fa fa-plus btn-add"
      aria-hidden="true"
      on:click={handleOpenNewBoardMenu}
    />
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
            <i
              class="fa fa-star board-star"
              aria-hidden="true"
              on:click|stopPropagation={() => handleFavoriteChange(board.id)}
            />
          {:else}
            <i
              class="fa fa-star-o board-star "
              aria-hidden="true"
              on:click|stopPropagation={() => handleFavoriteChange(board.id)}
            />
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
    color: whitesmoke;
    align-self: center;
    padding: 6px 7px 4px 7px;
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
    padding: 2px;
    color: whitesmoke;
    float: right;
  }

  .board-star:hover {
    color: white;
  }
</style>
