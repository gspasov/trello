<script lang="ts">
  import { RedoEvent, UndoEvent } from "../events";
  import { addHistoryEvent } from "../stores/eventStore";
  import SearchBar from "./SearchBar.svelte";

  export let backgroundColor: string;

  function handleUndo(): void {
    addHistoryEvent(UndoEvent());
  }

  function handleRedo(): void {
    addHistoryEvent(RedoEvent());
  }
</script>

<section style="background-color: {backgroundColor}">
  <div class="container">
    <span><span class="q">Q</span><span>uantrello</span></span>
    <div>
      <SearchBar />
      <div class="undo-redo-section">
        <button aria-label="Undo" title="Undo" on:click={handleUndo}>
          <i class="fa fa-undo" aria-hidden="true" />
        </button>
        <button aria-label="Redo" title="Redo" on:click={handleRedo}>
          <i class="fa fa-repeat" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    position: relative;
    top: 0;
    height: 45px;
    width: 100%;
    box-shadow: 0px -4px 10px #555555;
    transition: 0.3s;
  }

  .container {
    display: flex;
    height: 100%;
    padding: 0px 16px;
    align-items: center;
    justify-content: space-between;
  }
  span {
    font-size: 20px;
    color: white;
    font-weight: 800;
  }

  span .q {
    color: #01c0c9;
  }

  .undo-redo-section {
    display: inline;
  }

  button {
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0px 4px;
  }

  i {
    color: whitesmoke;
  }

  i:hover {
    color: white;
  }

  i:active {
    color: #555555;
  }
</style>
