<script lang="ts">
  import { slide } from "svelte/transition";
  import Board from "./components/Board.svelte";
  import CardModal from "./components/card/CardModal.svelte";
  import ActionClose from "./components/general/ActionClose.svelte";
  import Modal from "./components/general/Modal.svelte";
  import Sidebar from "./components/general/Sidebar.svelte";
  import SidebarButton from "./components/general/SidebarButton.svelte";
  import Header from "./components/Header.svelte";
  import NewBoardMenu from "./components/NewBoardMenu.svelte";
  import type { Card } from "./models/card";
  import { createList, List } from "./models/list";
  import { BackgroundColor, BoardsStore } from "./stores";
  import { AppMenus, AppMenusVisibility, Coordinates } from "./supportTypes";

  let newListTitle = "";
  let isNewListSectionVisible = false;
  let inputRef: HTMLInputElement;
  let isSidebarOpen = false;
  let menusVisibility = initialMenusState();
  let menuPosition: Coordinates = { x: 0, y: 0 };
  let selectedCard: Card;
  let selectedList: List;
  let modalRef: Modal;

  $: selectedBoard = $BoardsStore.find((board) => board.selected);
  $: bodyStyle = `
    <style> 
      body {
        background-color: ${selectedBoard.color.color};
      } 
    </style>
  `;

  function handleCardOpen(e: CustomEvent): void {
    selectedList = selectedBoard.lists.find(
      (list) => list.id === e.detail.listId
    );
    selectedCard = selectedList.cards.find(
      (card) => card.id === e.detail.cardId
    );
    modalRef.show();
  }

  function toggleAddListSectionVisibility(): void {
    isNewListSectionVisible = !isNewListSectionVisible;
    setTimeout(() => inputRef.focus(), 1);
  }

  function handleCreateList(): void {
    createList(selectedBoard.id, newListTitle);

    newListTitle = "";
    isNewListSectionVisible = false;
  }

  function toggleSidebar(): void {
    isSidebarOpen = !isSidebarOpen;
  }

  function openMenuCustom(
    menu: AppMenus,
    event: CustomEvent<Coordinates>
  ): void {
    menuPosition = { x: event.detail.x, y: event.detail.y };
    showMenu(menu);
  }

  function initialMenusState(): AppMenusVisibility {
    return {
      newBoard: false,
    };
  }

  function closeAllMenus(): void {
    menusVisibility = initialMenusState();
  }

  function showMenu(menu: AppMenus): void {
    closeAllMenus();
    menusVisibility = { ...menusVisibility, [menu]: true };
  }
</script>

<Header />
<main>
  <Sidebar
    open={isSidebarOpen}
    on:click={toggleSidebar}
    on:openNewBoardMenu={(e) => openMenuCustom(AppMenus.NEW_BOARD, e)}
  />
  <SidebarButton move={isSidebarOpen} on:click={toggleSidebar} />
  <div class:move={isSidebarOpen} class="content-wrapper">
    {#if selectedBoard !== undefined}
      <Board board={selectedBoard} on:cardOpened={handleCardOpen} />
    {/if}
    <div>
      {#if isNewListSectionVisible}
        <div class="new-list-form" transition:slide={{ duration: 300 }}>
          <input
            class="input-primary"
            type="text"
            name="list"
            placeholder="Enter list title..."
            bind:value={newListTitle}
            bind:this={inputRef}
          />
          <ActionClose
            title={"Add list"}
            on:click={handleCreateList}
            on:close={toggleAddListSectionVisibility}
          />
        </div>
      {:else}
        <button
          class="btn-add-list"
          class:hidden={isNewListSectionVisible}
          on:click={toggleAddListSectionVisibility}
        >
          <i class="fa fa-plus" aria-hidden="true" /> Add another list
        </button>
      {/if}
    </div>
  </div>
</main>
{#if menusVisibility.newBoard}
  <NewBoardMenu
    x={menuPosition.x}
    y={menuPosition.y + 40}
    on:close={closeAllMenus}
  />
{/if}
<Modal bind:this={modalRef} backgroundColor={"#fdfdfd"}>
  <CardModal
    card={selectedCard}
    list={selectedList}
    boardId={selectedBoard.id}
  />
</Modal>

<svelte:head>
  {@html bodyStyle}
</svelte:head>

<style>
  .move {
    transform: translateX(250px);
  }
  main {
    margin-top: 45px;
    display: flex;
    overflow: hidden;
    height: 100vh;
    margin-left: 12px;
  }

  .content-wrapper {
    width: 100%;
    display: flex;
    gap: 0.25rem;
    overflow: auto;
    padding: 8px;
    padding-left: 16px;
    transition: 0.3s;
  }

  .hidden {
    display: none !important;
  }

  .btn-add-list {
    color: whitesmoke;
    border: none;
    text-align: left;
    background-color: #ffffff3d;
    width: 250px;
    padding: 10px 0px 10px 10px;
  }

  .btn-add-list:hover {
    background-color: #ffffff4f;
  }

  .btn-add-list:active {
    background-color: #ffffff6f;
  }

  .new-list-form {
    background-color: #ebecf0;
    padding: 5px;
    border-radius: 3px;
  }

  input {
    width: 250px;
    height: 37px;
    margin-bottom: 5px;
  }
</style>
