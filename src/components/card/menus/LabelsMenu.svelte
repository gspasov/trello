<script lang="ts">
  import Menu from "../../general/Menu.svelte"
  import MenuItem from "../../general/MenuItem.svelte"
  import LabelButton from "../LabelButton.svelte";
  import { createEventDispatcher } from "svelte"
  import { LabelStore } from "../../../stores"
  import type { Card } from "../../../models/card";

  export let x: number;
  export let y: number;
  export let card: Card

  const dispatch = createEventDispatcher();

  $: labels = $LabelStore;

</script>

<Menu title={"Labels"} {x} {y} on:close>
  <MenuItem>
    <h4>Labels</h4>
    <div class="labels-wrapper">
      {#each labels as label (label.id)}
        <LabelButton {card} {label} on:select on:edit />
      {/each}
    </div>
    <div class="gray-button" on:click={() => dispatch("create")}>Create a new label</div>
  </MenuItem>
</Menu>

<style>
  h4 {
    margin: 0;
    font-size: 12px;
    color: #5e6c84;
    font-weight: 600;
  }

  .labels-wrapper {
    overflow: auto;
    max-height: 30vh
  }

  .gray-button {
    background: #091e420a;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
    line-height: 20px;
    font-size: 14px;
    margin-top: 8px;
    padding: 6px 0px;
  }

  .gray-button:hover {
    background: #091e4221;
  }
</style>