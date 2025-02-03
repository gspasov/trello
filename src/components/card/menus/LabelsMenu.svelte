<script lang="ts">
  import Menu from "../../general/Menu.svelte";
  import MenuItem from "../../general/MenuItem.svelte";
  import LabelButton from "../LabelButton.svelte";
  import { createEventDispatcher } from "svelte";
  import type { Label } from "../../../models/label";
  import { Just } from "@quanterall/lich";

  export let x: number;
  export let y: number;
  export let labels: Label[];
  export let cardLabelIds: string[];

  const dispatch = createEventDispatcher();
</script>

<Menu title={Just("Labels")} left={Just(x)} top={Just(y)} on:close>
  <MenuItem slot="content">
    <h4>Labels</h4>
    <div class="labels-wrapper">
      {#each labels as label (label.id)}
        <LabelButton {cardLabelIds} {label} on:select on:edit />
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
    display: grid;
    gap: 0.25rem;
    overflow: auto;
    max-height: 30vh;
    padding: 4px 0px;
  }

  button {
    width: 100%;
    margin-top: 8px;
    padding: 6px 0px;
  }
</style>
