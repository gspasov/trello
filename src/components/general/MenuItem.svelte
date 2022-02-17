<script lang="ts">
  export let lineText: string = "";
  export let hover: boolean = false;
  export let selected: boolean = false;
</script>

<div on:click>
  {#if lineText}
    <span>{lineText}</span>
  {:else}
    <div class="slot" class:hover class:selected>
      <slot />
    </div>
  {/if}
</div>

<style>
  .slot {
    padding: 6px 12px;
  }

  .hover:hover {
    cursor: pointer;
    background-color: #eeeeee44;
  }

  span {
    display: block;
    padding: 6px 12px;
    cursor: pointer;
    position: relative;
  }

  .selected {
    background-color: #eeeeee44;
  }

  span:hover {
    background-color: #eee;
  }
</style>
