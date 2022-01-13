<script lang="ts">
  import { BoardStore } from "./stores";

  export let listId: string
  export let id: string;
  export let title: string;

  let isCloseBtnHidden: boolean = true;

  function deleteCard(): void {
    BoardStore.update((state) => {
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== id),
            };
          }
          return list;
        }),
      }
    });
  }

  function setCloseBtnVisibility(isVisible: boolean): void {
    isCloseBtnHidden = isVisible;
  }

</script>

<div class="card" on:mouseleave={() => setCloseBtnVisibility(true)} on:mouseenter={() => setCloseBtnVisibility(false)}>
  <span class="title">{title}</span>
  <div class="close-parent">
    <button class="close" class:hidden={isCloseBtnHidden} on:click={deleteCard}>&#10006;</button>
  </div>
</div>

<style>
  .card {
    position: relative;
    display: flex;
    justify-content: space-between;
		background-color: white;
    min-height: 20px;
		border-radius: 2px;
		padding: 5px 0px 5px 8px;
		box-shadow: 0 1px 0 #091e4240;
    font-size: 14px;
    cursor: pointer;
	}
  
  .card:hover {
    background-color: whitesmoke;
  }
  
  .title {
    display: flex;
    align-self: center;
    line-height: 20px;
  }

  .close-parent {
    position: absolute;
    right: 2px;
    top: 2px;
  }

  .close {
    align-items: flex-start;
    background: none;
    border: none;
    font-size: 12px;
    color: #999;
    cursor: pointer;
    margin: 0;
    padding: 5px 8px;
    /* margin: 4px 0px; */
  }

  .close:hover {
    background-color: #d2d2d2;
    color: #444;
    border-radius: 4px;
  }

  .hidden {
    display: none;
  }
</style>