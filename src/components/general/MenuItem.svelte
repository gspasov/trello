<script lang="ts">
  export let lineText: string = "";
</script>

<div on:click>
  {#if lineText}
    <span>{lineText}</span>
  {:else}
  <div class="slot">
    <slot/>
  </div>
  {/if}
</div>

<style>
  .slot {
    padding: 6px 12px;
  }
  span {
    font-size: 14px;
    display: block;
    padding: 6px 12px;
    cursor: pointer;
    position: relative;
  }
  
  span:hover {
    background-color: #eee;
  }
</style>