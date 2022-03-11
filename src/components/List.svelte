<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  import Menu from "./general/Menu.svelte";
  import MenuItem from "./general/MenuItem.svelte";
  import { clickOutside } from "../clickOutside";
  import Divider from "./general/Divider.svelte";
  import { flip } from "svelte/animate";
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
  import ActionClose from "./general/ActionClose.svelte";
  import type { Card as CardType } from "../models/card";
  import type { List } from "../models/list";
  import { addWorkspaceEvent } from "../stores/eventStore";
  import {
    CloseListMenuEvent,
    ConsiderMoveCardEvent,
    CreateCardEvent,
    DeleteAllCardsFromListEvent,
    DeleteListEvent,
    MoveCardEvent,
    OpenListMenuEvent,
    RenameListEvent,
  } from "../events";
  import type { DispatchCardOpen } from "../supportTypes";
  import { nullableToMaybe } from "@quanterall/lich";
  import { hasOwnProperty } from "../utilities";

  export let list: List;
  export let boardId: string;

  let newTitleText = list.title;
  let newCardTitle = "";
  let isAddCardSectionVisible = false;
  let isEditingListTitle = false;
  let newTitleInputRef: HTMLInputElement;
  let newCardInputRef: HTMLTextAreaElement;
  let menuPosition = { x: 0, y: 0 };
  const dispatch = createEventDispatcher<DispatchCardOpen>();

  function handleConsiderDndCards(
    e: CustomEvent<GenericDndEvent<CardType>>
  ): void {
    const cards: CardType[] = e.detail.items;
    addWorkspaceEvent(
      ConsiderMoveCardEvent({ boardId, listId: list.id, cards })
    );
  }

  function handleDndCards(e: CustomEvent<GenericDndEvent<CardType>>): void {
    const cards: CardType[] = e.detail.items;
    addWorkspaceEvent(MoveCardEvent({ boardId, listId: list.id, cards }));
  }

  function transformDraggedElement(e: HTMLElement | undefined): void {
    nullableToMaybe(e)
      .bind((element) =>
        nullableToMaybe(element.querySelector<HTMLElement>(".card"))
      )
      .map((element) => (element.style.transform = "rotate(5deg)"));
  }

  function toggleAddCardSectionVisibility(): void {
    isAddCardSectionVisible = !isAddCardSectionVisible;
    setTimeout(() => newCardInputRef.focus(), 1);
  }

  function hideAddCardSection(): void {
    isAddCardSectionVisible = false;
  }

  function handleCreateCard(): void {
    if (newCardTitle.trim() !== "") {
      addWorkspaceEvent(
        CreateCardEvent({ boardId, listId: list.id, title: newCardTitle })
      );
    }
    newCardTitle = "";
    hideAddCardSection();
  }

  function openListMenu(
    event: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement }
  ): void {
    const rect = event.currentTarget.getBoundingClientRect();
    menuPosition = { x: rect.left, y: rect.top };
    addWorkspaceEvent(OpenListMenuEvent({ boardId, listId: list.id }));
  }

  function handleDeleteList(): void {
    addWorkspaceEvent(CloseListMenuEvent({ boardId, listId: list.id }));
    addWorkspaceEvent(DeleteListEvent({ boardId, listId: list.id }));
  }

  function deleteAllCardsFromList(): void {
    addWorkspaceEvent(CloseListMenuEvent({ boardId, listId: list.id }));
    addWorkspaceEvent(
      DeleteAllCardsFromListEvent({ boardId, listId: list.id })
    );
  }

  function startEditingListTitle(): void {
    isEditingListTitle = true;
    addWorkspaceEvent(CloseListMenuEvent({ boardId, listId: list.id }));
    setTimeout(() => newTitleInputRef.focus(), 1);
  }

  function closeListMenu(): void {
    addWorkspaceEvent(CloseListMenuEvent({ boardId, listId: list.id }));
  }

  function handleTitleInputSubmit(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      addWorkspaceEvent(
        RenameListEvent({ boardId, listId: list.id, title: newTitleText })
      );
      isEditingListTitle = false;
    }
    if (e.key === "Escape") {
      isEditingListTitle = false;
    }
  }

  function handleCardClick(list: List, card: CardType): void {
    dispatch("cardOpened", { list, card });
  }
</script>

<div class="list">
  <div class="title-section">
    <div
      class:hidden={isEditingListTitle}
      class="title"
      on:click={() => (isEditingListTitle = true)}
    >
      {list.title}
    </div>
    <input
      class:hidden={!isEditingListTitle}
      class="input-primary"
      bind:value={newTitleText}
      bind:this={newTitleInputRef}
      on:keydown={handleTitleInputSubmit}
    />
    <span class="btn-list-menu" on:click|stopPropagation={openListMenu}
      >&#9679;&#9679;&#9679;</span
    >
  </div>
  <div
    class="cards"
    use:dndzone={{
      items: list.cards,
      flipDurationMs: 300,
      transformDraggedElement,
      dropTargetStyle: {},
    }}
    on:consider={handleConsiderDndCards}
    on:finalize={handleDndCards}
  >
    {#each list.cards as card (card.id)}
      <div style="position: relative;" animate:flip={{ duration: 300 }}>
        <Card
          {card}
          listId={list.id}
          {boardId}
          on:click={() => handleCardClick(list, card)}
        />
        {#if hasOwnProperty(card, SHADOW_ITEM_MARKER_PROPERTY_NAME) && card[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
          <span class="card-shadow" />
        {/if}
      </div>
    {/each}
  </div>
  <div class:hidden={!isAddCardSectionVisible}>
    <div class="textarea-parent">
      <textarea
        type="text"
        name="card"
        placeholder="Enter a title for this card..."
        bind:value={newCardTitle}
        bind:this={newCardInputRef}
      />
    </div>
    <div class="add-card-parent">
      <ActionClose
        title={"Add card"}
        on:click={handleCreateCard}
        on:close={toggleAddCardSectionVisibility}
      />
    </div>
  </div>
  <button
    class="add-btn"
    class:hidden={isAddCardSectionVisible}
    on:click={toggleAddCardSectionVisibility}
  >
    <i class="fa fa-plus" aria-hidden="true" /> Add a card
  </button>
  {#if list.isMenuOpened}
    <div use:clickOutside={closeListMenu}>
      <Menu
        title={"List actions"}
        x={menuPosition.x}
        y={menuPosition.y}
        on:close={closeListMenu}
      >
        <MenuItem lineText={"Rename"} on:click={startEditingListTitle} />
        <MenuItem
          lineText={"Delete All Cards from List"}
          on:click={deleteAllCardsFromList}
        />
        <Divider />
        <MenuItem lineText={"Delete"} on:click={handleDeleteList} />
      </Menu>
    </div>
  {/if}
</div>

<style>
  .list {
    background-color: #ebecf0;
    width: 250px;
    padding: 8px 4px;
    border-radius: 3px;
  }

  .title-section {
    display: flex;
    justify-content: space-between;
    padding: 0px 4px;
  }

  .title {
    font-weight: 600;
    align-self: center;
    padding-left: 6px;
  }

  input {
    align-self: center;
    font-weight: 600;
  }

  .btn-list-menu {
    font-size: 8px;
    padding: 4px 8px;
    color: #999;
    align-self: center;
    border-radius: 3px;
    cursor: pointer;
  }

  .btn-list-menu:hover {
    background-color: #d2d2d2;
    color: #444;
  }

  .cards {
    display: grid;
    gap: 0.5rem;
    padding: 4px;
    max-height: 85vh;
    overflow: auto;
  }

  .hidden {
    display: none !important;
  }

  .textarea-parent {
    margin: 0px 4px;
  }

  textarea {
    display: block;
    box-shadow: 0 1px 0 #091e4240;
    border-color: white;
    width: 100%;
    min-height: 54px;
    max-height: 162px;
    resize: vertical;
    margin-bottom: 0.4em;
  }

  .add-card-parent {
    margin-left: 4px;
  }

  .add-btn {
    width: 100%;
    border: none;
    text-align: left;
    line-height: 24px;
    color: #666666;
    background-color: #ebecf0;
  }

  .add-btn:hover {
    background-color: #dddddd;
  }

  .card-shadow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;
    border: 1px dashed grey;
    background: lightblue;
    opacity: 0.5;
    margin: 0;
    border-radius: 3px;
    font-size: 0.8rem;
    padding-left: 4px;
    text-align: center;
  }
</style>
