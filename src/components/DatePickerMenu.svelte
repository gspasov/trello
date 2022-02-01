<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { DatePicker } from "date-picker-svelte"
  import Menu from "./Menu.svelte"

  export let x: number;
  export let y: number;
  let date = new Date();

  const dispatchDate = createEventDispatcher<{select: Date}>();
  const dispatch = createEventDispatcher();
</script>

<Menu title={"Due date"} {x} {y} on:close>
  <div>
    <DatePicker bind:value={date} />
    <button on:click={() => dispatchDate("select", date)}>Save</button>
    <button class="remove" on:click={() => dispatch("remove")}>Remove</button>
  </div>
</Menu>

<style>
  div {
    text-align: center;
  }

  button {
    width: 90%;
    background-color: #0079bf;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    padding: 4px 10px;
    cursor: pointer;
    border: 2px solid #0079bf;
    border-radius: 3px;
    margin: 0px 12px 6px 12px
  }

  .remove {
    background-color: gray;
    border: 2px solid gray;
    margin: 0px 12px 8px 12px
  }
</style>