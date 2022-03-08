<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { DatePicker } from "date-picker-svelte";
  import Menu from "../../general/Menu.svelte";
  import type { DispatchSelectDueDate } from "../../../supportTypes";

  export let x: number;
  export let y: number;
  export let showRemoveButton: boolean;
  let date = new Date();

  const dispatchDate = createEventDispatcher<DispatchSelectDueDate>();
  const dispatch = createEventDispatcher();
</script>

<Menu title={"Due date"} {x} {y} on:close>
  <div>
    <DatePicker bind:value={date} />
    <button class="btn-primary" on:click={() => dispatchDate("select", date)}
      >Save</button
    >
    {#if showRemoveButton}
      <button class="btn-secondary" on:click={() => dispatch("remove")}
        >Remove</button
      >
    {/if}
  </div>
</Menu>

<style>
  div {
    text-align: center;
  }

  button {
    width: 90%;
    margin: 0px 12px 6px 12px;
  }
</style>
