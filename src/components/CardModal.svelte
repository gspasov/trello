<script lang="ts">
  import type * as types from "../types"
  import ActionClose from "./ActionClose.svelte";
  import ModalAction from "./ModalAction.svelte";
  import { BoardStore } from "../stores";
  import Menu from "./Menu.svelte"
  import MenuItem from "./MenuItem.svelte"
  import Divider from "./Divider.svelte"
  
  export let card: types.Card;
  export let list: types.List;

  let cardDescription: string = card.description;
  let isDescriptionEditVisible = false;
  let inputRef: HTMLTextAreaElement;
  let menuPosition = { x: 0, y: 0 };
  let isLabelsMenuVisible = false;
  let isMoveMenuVisible = false;

  function toggleDescriptionEditSection():void {
    isDescriptionEditVisible = !isDescriptionEditVisible;
    setTimeout(() => inputRef.focus(), 1);
  }

  function editCardDescription(): void {
    BoardStore.update((state) => {
      return {...state, lists: state.lists.map((l) => {
        if (list.id !== l.id) return l;
        return {...l, cards: l.cards.map((c) => {
          if (card.id !== c.id) return c
          return {...c, description: cardDescription};
        })};
      })};
    });
    card = {...card, description: cardDescription};
    toggleDescriptionEditSection();
  }

  function openLabelsMenu(event: MouseEvent & {currentTarget: EventTarget & HTMLSpanElement}): void {
    menuPosition = { x: event.currentTarget.offsetLeft, y: event.currentTarget.offsetTop };
    isLabelsMenuVisible = true;
  }

  function openMoveMenu(event: MouseEvent & {currentTarget: EventTarget & HTMLSpanElement}): void {
    menuPosition = { x: event.currentTarget.offsetLeft, y: event.currentTarget.offsetTop };
    isMoveMenuVisible = true;
  }

  function closeLabelsMenu(): void {
    isLabelsMenuVisible = false;
  }

  function closeMoveMenu(): void {
    isMoveMenuVisible = false;
  }
</script>

<div>
  <div class="title-section">
    <h3>{card.title}</h3>
    <span>in list {list.name}</span>
  </div>
  <div class="container">
    <div class="window-main">
      <h4>Description</h4>
      <div class="description-section">
        {#if isDescriptionEditVisible}
          <div class="description-edit">
            <textarea placeholder="Add a more detailed description..." bind:value={cardDescription} bind:this={inputRef}></textarea>
            <ActionClose title={"Save"} on:click={editCardDescription} on:close={toggleDescriptionEditSection} />
          </div>
        {:else}
          <div class="description-text" on:click={toggleDescriptionEditSection}>
            {#if card.description !== undefined}
              <p>{card.description}</p>
            {:else}
              <p class="missing-description">Add a more detailed description...</p>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    <div class="window-sidebar">
      <div class="sidebar-flex">
        <span class="title">Add to card</span>
        <span on:click|stopPropagation={openLabelsMenu}>
          <ModalAction text={"Labels"} />
        </span>
      </div>
      <div class="sidebar-flex">
        <span class="title">Actions</span>
        <span on:click|stopPropagation={openMoveMenu}>
          <ModalAction text={"Move"} />
        </span>
        <ModalAction text={"Delete"} />
      </div>
    </div>
  </div>
</div>
{#if isLabelsMenuVisible}
  <Menu title={"Labels"} x={menuPosition.x} y={menuPosition.y + 40} on:close={closeLabelsMenu} >
  </Menu>
{/if}

{#if isMoveMenuVisible}
  <Menu title={"Move card"} x={menuPosition.x} y={menuPosition.y + 40} on:close={closeMoveMenu} >
  </Menu>
{/if}

<style>
  h3, h4 {
    margin: 0;
    font-weight: 600;
  }

  h4 {
    color: #172b4d;
    margin-bottom: 0.5rem;
  }

  textarea {
    border: none;
    box-shadow: inset 0 0 0 2px #0079bf;
    overflow-wrap: break-word;
    resize: none;
    width: 100%;
    line-height: 20px;
    padding: 8px 12px;
    font-size: 0.85rem;
    min-height: 100px;
    border-radius: 3px;
    margin: 0;
  }

  textarea:focus {
    outline: none;
  }

  .title-section {
    margin-bottom: 10px;
  }

  .description-text {
    cursor: pointer;
    font-size: 0.85rem;
  }
  .missing-description {
    background-color: #dddddd;
    padding: 8px 12px;
    min-height: 40px;
    border-radius: 3px;
  }

  .missing-description:hover {
    background-color: #cccccc;
  }
  
  .container {
    display: flex;
    gap: 0.8rem;
  }

  .window-main {
    flex-grow: 2;
    width: 25ch;
  }

  .window-sidebar {
    flex-grow: 1;
  }

  .window-sidebar span[class*='title'] {
    color: #5e6c84;
    font-size: 12px;
    line-height: 20px;
    font-weight: 600;
  }
  .sidebar-flex {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }  
</style>