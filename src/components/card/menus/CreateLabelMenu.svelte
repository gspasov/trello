<script lang="ts">
  import Menu from "../../general/Menu.svelte"
  import { createEventDispatcher } from "svelte"
  import * as types from "../../../types"
  import { LabelStore, DefaultLabelStore } from "../../../stores"
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from "uuid"

  export let x: number;
  export let y: number;
  export let label: types.Label = undefined;
  export let isEditMode = false;

  const dispatch = createEventDispatcher();
  let inputRef: HTMLInputElement;
  let labelName: string = label?.name ?? "";
  let selectedColorType: types.LabelColorType = label?.type ?? types.LabelColorType.Green
  
  onMount(() => inputRef.focus());

  function handleCreate(): void {
    LabelStore.update((labels) => {
      return types.orderLabelsByColor([
        ...labels,
        {
          id: uuidv4(),
          type: selectedColorType,
          color: types.labelColorTypeMapping(selectedColorType),
          name: labelName,
        }
      ]);
    });
    dispatch("back");
  }

  function handleEdit(): void {
    LabelStore.update((labels) => {
      return types.orderLabelsByColor(labels.map((l) => {
          if (label.id !== l.id) return l;
          return {
            ...l,
            type: selectedColorType,
            color: types.labelColorTypeMapping(selectedColorType),
            name: labelName,
          };
        }))
      });
    dispatch("back");
  }

  function handleColorSelection(colorType: types.LabelColorType): void {
    selectedColorType = colorType;
  }
</script>

<Menu title={isEditMode ? "Change label" : "Create label"} {x} {y} isSubMenu={true} on:close on:back>
  <div class="content">
    <span class="title">Name</span>
    <input name="label" bind:this={inputRef} bind:value={labelName} />
    <span class="title">Select color</span>
    <div class="color-box-wrapper">
      {#each $DefaultLabelStore as {id, color, type} (id)}
        <span class="color-box" style="--color: {color}; --color-hover: {color}99;" on:click={() => handleColorSelection(type)}>
          {#if selectedColorType === type}
            &#10004;
          {/if}
        </span>
      {/each}
    </div>
    <div class="actions-wrapper">
      {#if isEditMode} 
        <button class="save" on:click={handleEdit}>Save</button>
        <button class="delete" on:click={() => dispatch("delete")}>Delete</button>
      {:else}
        <button class="save" on:click={handleCreate}>Create</button>
      {/if}
    </div> 
  </div>
</Menu>

<style>

  .content {
    padding: 0px 12px 6px 12px;
  }
  input {
    border: none;
    width: 100%;
    line-height: 20px;
    border-radius: 3px;
    box-shadow: inset 0 0 0 2px #0079bf;
    margin-bottom: 12px;
    font-size: 14px;
  }

  input:focus {
    outline: none;
  }

  span.title {
    display: block;
    color: #5e6c84;
    font-size: 12px;
    line-height: 20px;
    font-weight: 600;
  }

  .color-box-wrapper {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 0.5rem;
  }
  .color-box {
    width: 50px;
    height: 30px;
    border-radius: 3px;
    background-color: var(--color);
    cursor: pointer;
    color: white;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
  }

  .color-box:hover {
    background-color: var(--color-hover);
  }

  .actions-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button.save {
    background-color: #0079bf;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    padding: 4px 10px;
    cursor: pointer;
    border: 2px solid #0079bf;
    width: 70px;
    border-radius: 3px;
    margin: 0;
  }

  button.delete {
    background-color: #b04632;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    padding: 4px 10px;
    cursor: pointer;
    border: 2px solid #b04632;
    width: 70px;
    border-radius: 3px;
    margin: 0;
  }

  button:hover {
    filter: brightness(90%);
  }
</style>
