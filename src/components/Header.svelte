<script lang="ts">
  import { boardColorTypeDarkMapping } from "../models/board";
  import { WorkspaceStore } from "../stores/workspaceStore";

  $: boards = $WorkspaceStore;
  $: backgroundColor = boardColorTypeDarkMapping(
    boards.find((b) => b.selected).color.type
  );

  function handleUndo(): void {}

  function handleRedo(): void {}
</script>

<section style="background-color: {backgroundColor}">
  <div class="container">
    <span>Quantrello</span>
    <div class="undo-redo-section">
      <button aria-label="Undo" title="Undo">
        <i class="fa fa-undo" aria-hidden="true" on:click={handleUndo} />
      </button>
      <button aria-label="Redo" title="Redo">
        <i class="fa fa-repeat" aria-hidden="true" on:click={handleRedo} />
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
