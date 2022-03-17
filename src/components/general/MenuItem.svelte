<script lang="ts">
  export let lineText: string = "";
  export let hover: boolean = false;
  export let selected: boolean = false;
  export let hoverColor: string = "#eeeeee";
</script>

<div on:click>
  {#if lineText}
    <span class:hover class:selected style="--hoverColor: {hoverColor}"
      >{lineText}</span
    >
  {:else}
    <div
      class="slot"
      class:hover
      class:selected
      style="--hoverColor: {hoverColor}"
    >
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
    background-color: var(--hoverColor);
  }

  span {
    display: block;
    padding: 6px 12px;
    position: relative;
  }

  .selected {
    background-color: #eeeeee44;
  }
</style>
