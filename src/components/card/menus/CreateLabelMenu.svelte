<script lang="ts">
  import Menu from "../../general/Menu.svelte";
  import { createEventDispatcher } from "svelte";
  import {
    Label,
    LabelColorType,
    createLabel,
    updateLabel,
    labelColorTypeMapping,
  } from "../../../models/label";
  import { DefaultLabelStore } from "../../../stores";
  import { onMount } from "svelte";
  import { Just, Maybe, Nothing } from "@quanterall/lich";
  import { stringToMaybe } from "../../../utilities";
  import LabelBox from "../../general/LabelBox.svelte";
  import LabeledInput from "../../general/LabeledInput.svelte";

  export let x: number;
  export let y: number;
  export let label: Maybe<Label> = Nothing();
  export let isEditMode = false;
  export let boardId: string;

  const dispatch = createEventDispatcher();
  let inputRef: HTMLInputElement;
  let labelName: string = getLabelName(label);
  let selectedColorType: LabelColorType = getLabelColorType(label);

  onMount(() => inputRef.focus());

  function handleCreate(): void {
    createLabel(boardId, selectedColorType, stringToMaybe(labelName));
    dispatch("back");
  }

  function handleEdit(): void {
    if (isLabelChanged(label)) {
      label = label
        .map((label) => ({
          ...label,
          type: selectedColorType,
          color: labelColorTypeMapping(selectedColorType),
          name: stringToMaybe(labelName),
        }))
        .onJust((l) => updateLabel(l.id, boardId, l));
    }

    dispatch("back");
  }

  function getLabelName(l: Maybe<Label>): string {
    return l.fold("", (v) => v.name.fold("", (x) => x));
  }

  function getLabelColorType(l: Maybe<Label>): LabelColorType {
    return l.map((v) => v.type).otherwise(LabelColorType.Green);
  }

  function isLabelChanged(l: Maybe<Label>): boolean {
    return (
      labelName !== getLabelName(l) ||
      selectedColorType !== l.fold(LabelColorType.Green, (v) => v.type)
    );
  }

  function handleColorSelection(colorType: LabelColorType): void {
    selectedColorType = colorType;
  }
</script>

<Menu
  title={isEditMode ? "Change label" : "Create label"}
  {x}
  {y}
  isSubMenu={true}
  on:close
  on:back
>
  <div class="content">
    <LabeledInput
      title={Just("Name")}
      bind:ref={inputRef}
      bind:value={labelName}
    />
    <span class="title">Select color</span>
    <div class="color-box-wrapper">
      {#each $DefaultLabelStore as { id, color, type } (id)}
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
    <div class="actions-wrapper">
      {#if isEditMode}
        <button class="btn-primary" on:click={handleEdit}>Save</button>
        <button class="btn-danger" on:click={() => dispatch("delete")}
          >Delete</button
        >
      {:else}
        <button class="btn-primary" on:click={handleCreate}>Create</button>
      {/if}
    </div>
  </div>
</Menu>

<style>
  .content {
    padding: 0px 12px 6px 12px;
  }

  span.title {
    display: block;
    color: #5e6c84;
    font-size: 12px;
    font-weight: 600;
  }

  .color-box-wrapper {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 0.5rem;
  }

  .actions-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button {
    width: 70px;
  }
</style>
