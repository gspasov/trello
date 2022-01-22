<script lang="ts">
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher();
  export let title: string = "";

</script>

<div>
  <button on:click={() => dispatch("click")}>{title}</button>
  <span on:click={() => dispatch("close")}>&times;</span>
</div>

<style>
  div {
    display: flex;
    gap: 0.5rem;
  }
  button {
    background-color: #0079bf;
    color: #fff;
    font-size: 0.9rem;
    padding: 5px 10px;
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
    font-size: 2rem;
    color: #999;
    cursor: pointer;
    padding: 0px 0px 5px 0px;
    line-height: 90%;
  }

  span:hover {
    color: #555;
  }
</style>