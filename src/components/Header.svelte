<script lang="ts">
  import { nullableToMaybe } from "@quanterall/lich";

  import { RedoEvent, UndoEvent } from "../events";
  import { Board, boardColorTypeDarkMapping } from "../models/board";
  import { addHistoryEvent } from "../stores/eventStore";
  import { StateStore } from "../stores/stateStore";

  $: boards = $StateStore.boards;
  $: backgroundColor = nullableToMaybe<Board>(boards.find((b) => b.selected))
    .map((board) => boardColorTypeDarkMapping(board.color.type))
    .otherwise("#000000");

  function handleUndo(): void {
    addHistoryEvent(UndoEvent());
  }

  function handleRedo(): void {
    addHistoryEvent(RedoEvent());
  }
</script>

<section style="background-color: {backgroundColor}">
  <div class="container">
    <span>Quantrello</span>
    <div class="undo-redo-section">
      <button aria-label="Undo" title="Undo" on:click={handleUndo}>
        <i class="fa fa-undo" aria-hidden="true" />
      </button>
      <button aria-label="Redo" title="Redo" on:click={handleRedo}>
        <i class="fa fa-repeat" aria-hidden="true" />
      </button>
    </div>
  </div>
</section>

<style>
  section {
    position: fixed;
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
    justify-content: space-between;
  }
  span {
    align-self: center;
    font-size: 20px;
    color: white;
    font-weight: 800;
  }

  .undo-redo-section {
    align-self: center;
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
