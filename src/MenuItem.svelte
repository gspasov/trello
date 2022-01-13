<script lang="ts">
  export let lineText: string;
</script>

<div on:click>
  {#if lineText}
    <span>{lineText}</span>
  {:else}
    <slot/>
  {/if}
</div>

<style>
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