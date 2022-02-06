<script lang="ts">
  import { slide } from "svelte/transition";
  import Board from "./components/Board.svelte";
  import ActionClose from "./components/general/ActionClose.svelte";
  import { createList } from "./models/list";

  let newListTitle = "";
  let isNewListSectionVisible = false;
  let inputRef: HTMLInputElement;

  function toggleAddListSectionVisibility(): void {
    isNewListSectionVisible = !isNewListSectionVisible;
    setTimeout(() => inputRef.focus(), 1);
  }

  function handleCreateList(): void {
    createList(newListTitle);

    newListTitle = "";
    isNewListSectionVisible = false;
  }
</script>

<main>
  <Board />
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
        + Add another list
      </button>
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    gap: 0.25rem;
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
