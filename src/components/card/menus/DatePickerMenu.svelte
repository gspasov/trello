<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { DatePicker } from "date-picker-svelte";
  import Menu from "../../general/Menu.svelte";

  export let x: number;
  export let y: number;
  let date = new Date();

  const dispatchDate = createEventDispatcher<{ select: Date }>();
  const dispatch = createEventDispatcher();
</script>

<Menu title={"Due date"} {x} {y} on:close>
  <div>
    <DatePicker bind:value={date} />
    <button class="btn-primary" on:click={() => dispatchDate("select", date)}
      >Save</button
    >
    <button class="btn-secondary" on:click={() => dispatch("remove")}
      >Remove</button
    >
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
