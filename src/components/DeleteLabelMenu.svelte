<script lang="ts">
  import Menu from "./Menu.svelte"
  import { createEventDispatcher } from "svelte"
  import { LabelStore } from "../stores"
  import type * as types from "../types"

  export let x: number;
  export let y: number;
  export let label: types.Label = undefined;

  const dispatch = createEventDispatcher();

  function handleDelete(): void {
    LabelStore.update((labels) => {
      return labels.filter((l) => l.id !== label.id);
    })
    dispatch("delete");
  }
</script>

<Menu title={"Delete label?"} {x} {y} isSubMenu={true} on:close on:back>
  <div class="container">
    <span>There is no undo. This will remove this label from all cards and destroy its history.</span>
    <button on:click={handleDelete}>Delete</button>
  </div>
</Menu>

<style>

  .container {
    padding: 0px 12px 8px 12px;
  }

  span {
    font-size: 14px;
  }

  button {
    background-color: #b04632;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    padding: 6px 12px;
    cursor: pointer;
    border: none;
    width: 100%;
    border-radius: 3px;
    margin: 10px 0px 0px 0px;
  }
  button:hover {
    /* background-color: #b04632ee; */
    filter: brightness(90%);
  }
</style>