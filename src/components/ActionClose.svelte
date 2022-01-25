<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import CloseButton from "./CloseButton.svelte";
  const dispatch = createEventDispatcher();
  export let title: string = "";

</script>

<div>
  <button on:click={() => dispatch("click")}>{title}</button>
  <span>
    <CloseButton on:click={() => dispatch("close")} />
  </span>
</div>

<style>
  div {
    display: flex;
    gap: 0.5rem;
  }
  button {
    background-color: #0079bf;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    padding: 4px 10px;
    cursor: pointer;
    border: 2px solid #0079bf;
    margin: 0;
  }

  button:hover {
    background-color: #026aa7;
    border: 2px solid #026aa7;
    color: #fff;
  }
  
  button:focus {
    border: 2px solid #333;
  }

  button:active {
    background-color: #055a8c;
  }

  span {
    align-self: center;
  }
</style>