<script lang="ts">
  import { 
    Card, 
    List, 
    Label, 
    Coordinates, 
    CardModalMenusVisibility, 
    DispatchCompletedPayload, 
    DefaultMouseEvent, 
    CardModalMenus } from "../../types"
  import { BoardStore, LabelStore } from "../../stores";
  import ActionClose from "../general/ActionClose.svelte";
  import ModalAction from "./ModalAction.svelte";
  import LabelsMenu from "./menus/LabelsMenu.svelte";
  import MoveCardMenu from "./menus/MoveCardMenu.svelte";
  import CreateLabelMenu from "./menus/CreateLabelMenu.svelte";
  import DeleteLabelMenu from "./menus/DeleteLabelMenu.svelte";
  import DatePickerMenu from "./menus/DatePickerMenu.svelte"
  import DueDate from "./DueDate.svelte"
  import LabelsSection from "./LabelsSection.svelte"
  
  export let card: Card;
  export let list: List;

  let cardDescription: string = card.description;
  let isDescriptionEditVisible = false;
  let inputRef: HTMLTextAreaElement;
  let menuPosition: Coordinates = { x: 0, y: 0 };
  let menusVisibility = initialMenusState();
  let editingLabel: Label;

  $: cardLabels = $LabelStore.filter((l) => card.labelIds.includes(l.id));

  function closeAllMenus(): void {
    menusVisibility = initialMenusState();
  }

  function initialMenusState(): CardModalMenusVisibility {
    return {
      labels: false,
      labelCreate: false,
      labelEdit: false,
      labelDelete: false,
      dueDate: false,
      move: false,
    };
  }

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

  function attachLabelToCard(e: CustomEvent): void {
    let label: Label = e.detail.label;
    BoardStore.update((state) => {
      return {...state, lists: state.lists.map((l) => {
        if (list.id !== l.id) return l;
        return {...l, cards: l.cards.map((c) => {
          if (card.id !== c.id) return c
          return updateCardLabel(c, label)
        })};
      })};
    });
    card = updateCardLabel(card, label)
  }

  function updateCardLabel(card: Card, label: Label): Card {
    return {
      ...card, 
      labelIds: 
        card.labelIds.includes(label.id) 
          ? card.labelIds.filter((id) => id !== label.id) 
          : [...card.labelIds, label.id]
    };
  }

  function handleDueDateCompleted(e: CustomEvent<DispatchCompletedPayload>): void {
    let completed = e.detail.completed;
    BoardStore.update((state) => {
      return {...state, lists: state.lists.map((l) => {
        if (list.id !== l.id) return l;
        return {...l, cards: l.cards.map((c) => {
          if (card.id !== c.id) return c
          return {...c, completed};
        })};
      })};
    });
    card = {...card, completed};
  }

  function openLabelEditMenu(e: CustomEvent): void {
    editingLabel = e.detail.label;
    closeAllMenus();
    menusVisibility = { ...menusVisibility, labelEdit: true };
  }

  function openMenu(menu: CardModalMenus, event?: DefaultMouseEvent): void {
    if (event !== undefined) {
      menuPosition = { x: event.currentTarget.offsetLeft, y: event.currentTarget.offsetTop };
    }
    showMenu(menu);
  }

  function openMenuCustom(menu: CardModalMenus, event: CustomEvent<Coordinates>): void {
    menuPosition = { x: event.detail.x, y: event.detail.y };
    showMenu(menu);
  }

  function showMenu(menu: CardModalMenus): void {
    closeAllMenus();
    menusVisibility = { ...menusVisibility, [menu]: true };
  }

  function handleSelectedDueDate(e: CustomEvent<Date>): void {
    BoardStore.update((state) => {
      return {...state, lists: state.lists.map((l) => {
        if (list.id !== l.id) return l;
        return {...l, cards: l.cards.map((c) => {
          if (card.id !== c.id) return c
          return {...c, dueDate: e.detail};
        })};
      })};
    });
    card = {...card, dueDate: e.detail};
    closeAllMenus();
  }

  function handleRemoveDueDate(): void {
    BoardStore.update((state) => {
      return {...state, lists: state.lists.map((l) => {
        if (list.id !== l.id) return l;
        return {...l, cards: l.cards.map((c) => {
          if (card.id !== c.id) return c
          return {...c, dueDate: undefined};
        })};
      })};
    });
    card = {...card, dueDate: undefined};
    closeAllMenus();
  }
</script>

<div>
  <div>
    <h3>{card.title}</h3>
    <span>in list {list.name}</span>
  </div>
  <div class="container">
    <div class="window-main">
      {#if cardLabels.length > 0}
        <LabelsSection labels={cardLabels} />
      {/if}
      {#if card.dueDate !== undefined}
        <DueDate 
          dueDate={card.dueDate} 
          completed={card.completed} 
          on:toggleCompleted={handleDueDateCompleted} 
          on:openDueDate={(e) => openMenuCustom(CardModalMenus.DUE_DATE, e)}/>
      {/if}
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
      <div class="sidebar-flex" style="margin-bottom: 1rem;">
        <span class="title">Add to card</span>
        <span on:click|stopPropagation={(e) => openMenu(CardModalMenus.LABELS, e)}>
          <ModalAction text={"Labels"} />
        </span>
        <span on:click|stopPropagation={(e) => openMenu(CardModalMenus.DUE_DATE, e)}>
          <ModalAction text={"Due Date"} />
        </span>
      </div>
      <div class="sidebar-flex">
        <span class="title">Actions</span>
        <span on:click|stopPropagation={(e) => openMenu(CardModalMenus.MOVE, e)}>
          <ModalAction text={"Move"} />
        </span>
        <ModalAction text={"Delete"} />
      </div>
    </div>
  </div>
</div>
{#if menusVisibility.labels}
  <LabelsMenu 
    {card}
    x={menuPosition.x} 
    y={menuPosition.y + 40} 
    on:select={attachLabelToCard}
    on:create={() => openMenu(CardModalMenus.LABEL_CREATE)}
    on:edit={(openLabelEditMenu)} 
    on:close={closeAllMenus} />
{/if}
{#if menusVisibility.labelCreate} 
  <CreateLabelMenu  
    x={menuPosition.x} 
    y={menuPosition.y + 40} 
    on:back={() => showMenu(CardModalMenus.LABELS)} 
    on:close={closeAllMenus} />
{/if}
{#if menusVisibility.labelEdit} 
  <CreateLabelMenu 
    label={editingLabel} 
    isEditMode={true}
    x={menuPosition.x} 
    y={menuPosition.y + 40} 
    on:back={() => showMenu(CardModalMenus.LABELS)} 
    on:delete={() => openMenu(CardModalMenus.LABEL_DELETE)} 
    on:close={closeAllMenus} />
{/if}
{#if menusVisibility.labelDelete}
  <DeleteLabelMenu 
    label={editingLabel} 
    x={menuPosition.x} 
    y={menuPosition.y + 40} 
    on:back={() => showMenu(CardModalMenus.LABEL_EDIT)} 
    on:delete={() => showMenu(CardModalMenus.LABELS)} 
    on:close={closeAllMenus} />
{/if}
{#if menusVisibility.dueDate}
  <DatePickerMenu 
    x={menuPosition.x} 
    y={menuPosition.y + 40} 
    on:select={handleSelectedDueDate} 
    on:remove={handleRemoveDueDate} 
    on:close={closeAllMenus} />
{/if}
{#if menusVisibility.move}
  <MoveCardMenu 
    x={menuPosition.x} 
    y={menuPosition.y + 40} 
    on:close={closeAllMenus} />
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

  .description-text {
    cursor: pointer;
    font-size: 0.85rem;
  }
  .missing-description {
    background-color: #091e420a;
    padding: 8px 12px;
    min-height: 40px;
    border-radius: 3px;
  }

  .missing-description:hover {
    background-color: #091e4211;
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