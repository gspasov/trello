<script lang="ts">
  import { Just } from "@quanterall/lich";
  import { onMount, createEventDispatcher } from "svelte";
  import { CreateBoardEvent } from "../events";
  import { BoardColorType, boardColorTypeMapping } from "../models/board";
  import { addWorkspaceEvent } from "../stores/eventStore";
  import { StateStore } from "../stores/stateStore";
  import LabelBox from "./general/LabelBox.svelte";
  import LabeledInput from "./general/LabeledInput.svelte";
  import Menu from "./general/Menu.svelte";
  import MenuItem from "./general/MenuItem.svelte";

  export let x: number;
  export let y: number;

  let boardTitle: string = "";
  let inputRef: HTMLInputElement;
  let selectedColorType: BoardColorType = BoardColorType.LightBlue;
  let isBoardTitleInvalid: boolean = false;

  // Focus the input when the menu loads
  onMount(() => inputRef.focus());

  const dispatch = createEventDispatcher();

  $: isBoardTitleInvalid = boardTitle.trim() === "";

  function handleColorSelection(colorType: BoardColorType): void {
    selectedColorType = colorType;
  }

  function handleBoardCreate(): void {
    if (!isBoardTitleInvalid) {
      addWorkspaceEvent(
        CreateBoardEvent({
          title: boardTitle.trim(),
          color: selectedColorType,
        })
      );
    }
    dispatch("close");
  }
</script>

<Menu title={"Create board"} {x} {y} on:close>
  <div class="preview-box">
    <LabelBox color={boardColorTypeMapping(selectedColorType)}>
      <img src="images/board-preview-skeleton.svg" alt="background preview" />
    </LabelBox>
  </div>
  <MenuItem>
    <LabeledInput
      title={Just("Board title")}
      bind:value={boardTitle}
      required={true}
      bind:ref={inputRef}
    />
  </MenuItem>
  <MenuItem>
    <span class="title">Background</span>
    <div class="color-box-wrapper">
      {#each $StateStore.boardColors as { id, color, type } (id)}
        <LabelBox
          {color}
          selectable={true}
          on:select={() => handleColorSelection(type)}
        >
          {#if selectedColorType === type}
            &#10004;
          {/if}
        </LabelBox>
      {/each}
    </div>
  </MenuItem>

  {#if isBoardTitleInvalid}
    <button class="btn-invalid">Create</button>
  {:else}
    <button class="btn-primary" on:click={handleBoardCreate}>Create</button>
  {/if}
</Menu>

<style>
  button {
    width: 90%;
    margin: 0px 12px 6px 12px;
  }

  span.title {
    display: block;
    color: #5e6c84;
    font-size: 12px;
    font-weight: 600;
  }

  .preview-box {
    margin: 8px;
  }

  .color-box-wrapper {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 0.5rem;
  }

  .btn-invalid {
    background-color: #f9f9f9;
    border-color: #f9f9f9;
    cursor: not-allowed;
    color: #a5adba;
  }
</style>
