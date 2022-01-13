<script lang="ts">
  import { fade } from 'svelte/transition';
  import Card from "./Card.svelte"
  import { BoardStore } from "./stores";
  import Menu from "./Menu.svelte"
  import MenuItem from "./MenuItem.svelte"
  import * as types from "./types"
  import { v4 as uuidv4 } from 'uuid';
  import { clickOutside } from './clickOutside';
  import Divider from './Divider.svelte';
  import { flip } from 'svelte/animate';
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

  export let id: string;
  export let name: string;
  export let cards: types.Card[];
  export let isMenuOpened = false;
  
  let newCardTitle = ""
  let isAddCardSectionVisible = false;
  let inputRef: HTMLTextAreaElement
  let menuPosition = { x: 0, y: 0 };

  function handleDndCards(e): void {
    BoardStore.update((state) => {
			return {
				...state,
				lists: state.lists.map((list) => {
          if (list.id !== id) return list;

          return {...list, cards: e.detail.items};
        }),
			}
		});
  }

  function transformDraggedElement(e): void {
    e.querySelector(".card").style.transform = "rotate(5deg)";
  }

  function toggleAddCardSectionVisibility(): void {
    isAddCardSectionVisible = !isAddCardSectionVisible;
    setTimeout(() => inputRef.focus(), 1);
  }

  function hideAddCardSection(): void {
    isAddCardSectionVisible = false;
  }

  function createCard(): void {
    if (newCardTitle.trim() !== "") {
      BoardStore.update((state) => {
        const newCardId = uuidv4();
        return {
          ...state,
          lists: state.lists.map((list) => {
            if (list.id !== id) return list;

            return {
              ...list,
              cards: [
                ...list.cards,
                types.Card(newCardId, newCardTitle, false),
              ],
            };
          }),
        }
      });
    }
    newCardTitle = "";
    hideAddCardSection();
  }

  function openListMenu(event: MouseEvent & {currentTarget: EventTarget & HTMLSpanElement}): void {
    const rect = event.currentTarget.getBoundingClientRect();
    menuPosition = { x: rect.left, y: rect.top };

    BoardStore.update((store) => {
      return {
        ...store,
        lists: store.lists.map((list) => {
          if (list.id !== id) return {...list, isMenuOpened: false};

          return {...list, isMenuOpened: true};
        }),
      }
    })
  }

  function closeListMenu(): void {
    BoardStore.update((store) => {
      return {
        ...store,
        lists: store.lists.map((list) => ({...list, isMenuOpened: false})),
      }
    })
  }
</script>

<div class="list">
  <div class="title-section">
    <div class="title">{name}</div>
    <span class="list-menu-btn" on:click|stopPropagation={openListMenu}>&#9679;&#9679;&#9679;</span>
  </div>
  <div 
    class="cards" 
    use:dndzone={{items: cards, flipDurationMs: 300, transformDraggedElement, dropTargetStyle: {}}}
    on:consider={handleDndCards} 
    on:finalize={handleDndCards}
  >
    {#each cards as card (card.id)}
      <div style={"position: relative"} animate:flip={{duration: 300}}>
        <Card id={card.id} title={card.title} listId={id}/>
        {#if card[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
          <span class="card-shadow"></span>
        {/if}
      </div>
    {/each}
  </div>
  <div class:hidden={!isAddCardSectionVisible}>
    <div class="textarea-parent">
      <textarea type="text" name="card" placeholder="Enter a title for this card..." bind:value={newCardTitle} bind:this={inputRef}/>
    </div>
    <div class="add-card-parent">
      <button class="add-card-btn" on:click={createCard}>Add Card</button>
      <span class="close" on:click={toggleAddCardSectionVisibility}>&#10006;</span>
    </div>
  </div>
  <div 
    class="add-btn" 
    class:hidden={isAddCardSectionVisible} 
    on:click={toggleAddCardSectionVisibility}>
      +Add a card
  </div>
  {#if isMenuOpened}
    <div transition:fade={{duration: 150}} use:clickOutside={closeListMenu}>
      <Menu x={menuPosition.x} y={menuPosition.y} on:close={closeListMenu}>
        <MenuItem lineText={"Rename"}/>
        <MenuItem lineText={"Delete All Cards from List"}/>
        <Divider/>
        <MenuItem lineText={"Delete"}/>
      </Menu>
    </div>
  {/if}
</div>

<style>
  .list {
		background-color: #ebecf0;
		width: 250px;
		padding: 10px 4px;
		border-radius: 3px;
	}

  .title-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0px 4px;
  }
  
	.title {
    height: 20px;
    font-size: 14px;
    font-weight: 600;
    align-self: center;
	}

  .list-menu-btn {
    font-size: 8px; 
    padding: 8px 7px;
    color: #999; 
    align-self: center;
    border-radius: 2px;
    cursor: pointer;
  }

  .list-menu-btn:hover {
    background-color: #d2d2d2;
    color: #444;
  }
  
  .cards {
    padding: 0px 4px;
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
    background-color: white;
		border-radius: 2px;
		box-shadow: 0 1px 0 #091e4240;
    border-color: white;
    font-size: 14px;
    width: 100%;
    min-height: 54px;
    max-height: 162px;
    color: #333;
    resize: vertical;
  }

  textarea:focus {
    outline: none;
  }

  .add-card-parent {
    margin-left: 4px;
  }

  .add-card-btn {
    background-color: #0079bf;
    border: none;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    margin: 0px 0px 0px 4px;
    cursor: pointer;
    border: 2px solid #0079bf;
    border-spacing: 20px;
    margin: 0;
  }

  .add-card-btn:hover {
    background-color: #026aa7;
    border: 2px solid #026aa7;
    color: #fff;
  }
  
  .add-card-btn:focus {
    border: 2px solid #333;
  }

  .add-card-btn:active {
    background-color: #055a8c;
  }

  .close {
    padding: 8px;
    color: #999;
    cursor: pointer;
  }

  .close:hover {
    color: #555;
  }

  button:hover {
    color: #555;
  }

  .add-btn {
    height: 30px;
    background-color: #ebecf0;
    border-radius: 3px;
    padding: 4px 4px;
    font-size: 14px;
    color: #666666;
    cursor: pointer;
    padding: 0px 4px;
    display: flex;
    align-items: center;
  }

  .add-btn:hover {
    background-color: #dddddd;
  }

  .card-shadow {
		position: absolute;
		top: 0; left:0; right: 0; bottom: 0;
		visibility: visible;
		border: 1px dashed grey;
		background: lightblue;
		opacity: 0.5;
		margin: 0;
    border-radius: 3px;
    font-size: 0.80rem;
    padding-left: 4px;
    text-align: center;
	}
</style>