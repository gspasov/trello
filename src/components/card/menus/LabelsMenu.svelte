<script lang="ts">
  import Menu from "../../general/Menu.svelte";
  import MenuItem from "../../general/MenuItem.svelte";
  import LabelButton from "../LabelButton.svelte";
  import { createEventDispatcher } from "svelte";
  import { LabelStore } from "../../../stores";
  import type { Card } from "../../../models/card";

  export let x: number;
  export let y: number;
  export let card: Card;

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
    <button class="btn-secondary " on:click={() => dispatch("create")}>
      Create a new label
    </button>
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
    max-height: 30vh;
  }

  button {
    width: 100%;
    margin-top: 8px;
    padding: 6px 0px;
  }
</style>
