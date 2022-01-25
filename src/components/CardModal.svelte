<script lang="ts">
  import type * as types from "../types"
  import { BoardStore } from "../stores";
  import { clickOutside } from "../clickOutside";
  import ActionClose from "./ActionClose.svelte";
  import ModalAction from "./ModalAction.svelte";
  import LabelsMenu from "./LabelsMenu.svelte";
  import MoveCardMenu from "./MoveCardMenu.svelte";
import CreateLabelMenu from "./CreateLabelMenu.svelte";
  
  export let card: types.Card;
  export let list: types.List;

  let cardDescription: string = card.description;
  let isDescriptionEditVisible = false;
  let inputRef: HTMLTextAreaElement;
  let menuPosition = { x: 0, y: 0 };
  let isLabelsMenuVisible = false;
  let isLabelEditMenuVisible = false;
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

  function openLabelEditSubmenu(): void {
    console.info("open submenu")
    isLabelEditMenuVisible = true;
    isLabelsMenuVisible = false;
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

  function closeLabelEditMenu(): void {
    console.info("close submenu")
    isLabelEditMenuVisible = false;
    isLabelsMenuVisible = true;
  }

  $: console.info(isLabelsMenuVisible)
</script>

<div>
  <div class="title-section">
    <h3>{card.title}</h3>
    <span>in list {list.name}</span>
  </div>
  <div class="container">
    <div class="window-main">
      <h4>Description</h4>
      {#if card.description !== undefined && !isDescriptionEditVisible}
        <div class="edit-button" on:click={toggleDescriptionEditSection}>Edit</div>
      {/if}
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
  <div use:clickOutside={closeLabelsMenu}>
    <LabelsMenu x={menuPosition.x} y={menuPosition.y + 40} on:close={closeLabelsMenu} on:show-edit-submenu={openLabelEditSubmenu}/>
  </div>
{/if}
{#if isLabelEditMenuVisible} 
  <CreateLabelMenu x={menuPosition.x} y={menuPosition.y + 40} on:close={closeLabelEditMenu} />
{/if}
{#if isMoveMenuVisible}
  <div use:clickOutside={closeMoveMenu}>
    <MoveCardMenu x={menuPosition.x} y={menuPosition.y + 40} on:close={closeMoveMenu} />
  </div>
{/if}

<style>
  h3, h4 {
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: 0;
  }

  h4 {
    color: #172b4d;
    padding: 6px 6px 6px 0px;
    margin-bottom: 0.5rem;
    display: inline-block;
    margin-bottom: 6px;
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
  .edit-button {
    display: inline-block;
    background: #091e420a;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
    line-height: 20px;
    font-size: 14px;
    padding: 6px 12px;
  }

  .edit-button:hover {
    background: #091e4221;
  }
</style>