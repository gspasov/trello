<script lang="ts">
  import Menu from "./Menu.svelte"
  import MenuItem from "./MenuItem.svelte"
  import LabelButton from "./LabelButton.svelte";
  import {createEventDispatcher} from "svelte"

  export let x: number;
  export let y: number;

  const dispatch = createEventDispatcher();

</script>

<Menu title={"Labels"} {x} {y} on:close={() => dispatch("close")} >
  <MenuItem>
    <h4>Labels</h4>
    <LabelButton color={"#61bd4f"} on:click={() => dispatch("show-edit-submenu")} />
    <LabelButton color={"#f2d600"} on:click={() => dispatch("show-edit-submenu")} />
    <LabelButton color={"#ff9f1a"} on:click={() => dispatch("show-edit-submenu")} />
    <LabelButton color={"#eb5a46"} on:click={() => dispatch("show-edit-submenu")} />
    <LabelButton color={"#c377e0"} on:click={() => dispatch("show-edit-submenu")} />
    <LabelButton color={"#0079bf"} on:click={() => dispatch("show-edit-submenu")} />
    <LabelButton color={"#00c2e0"} on:click={() => dispatch("show-edit-submenu")} />
    <LabelButton color={"#b3bac5"} on:click={() => dispatch("show-edit-submenu")} />
    <div class="gray-button">Create a new label</div>
  </MenuItem>
</Menu>

<style>
  h4 {
    margin: 0;
    font-size: 12px;
    color: #5e6c84;
    font-weight: 600;
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