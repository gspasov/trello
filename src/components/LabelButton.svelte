<script lang="ts">
  import {createEventDispatcher} from "svelte"

  export let color: string = "#0079bf";
  const dispatch = createEventDispatcher();
</script>

<div class="container">
  <div class="color" style="--color: {color}; --color-shadow: {color}99"></div>
  <div>
    <div class="pen" on:click={() => dispatch("click")}>
      <div>
        <span>&#x270F;</span>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    gap: 0.25rem;
    padding-top: 4px;
    justify-content: space-between;
  }

  .color {
    min-height: 20px;
    /* background: #0079bf;  */
    background: var(--color);
    border-radius: 3px;
    flex-grow: 9;
    padding: 6px 12px;
    cursor: pointer;
    transition: padding 85ms,margin 85ms,box-shadow 85ms;
  }

  .color:hover {
    box-shadow: -8px 0 var(--color-shadow);
    margin-left: 8px;
  }

  .pen {
    display: inline-block;
    margin-right: 20px;
    flex-grow: 1;
    padding: 6px 8px;
    border-radius: 3px;
    cursor: pointer;
    margin: 0;
  }

  .pen:hover {
    background: #eee;
  }
  
  .pen > div {
    transform: rotate(130deg);
  }
</style>

