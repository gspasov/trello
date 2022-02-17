<script lang="ts">
  import CloseButton from "./CloseButton.svelte";

  export let backgroundColor: string;
  export function show(): void {
    shown = true;
  }
  export function hide(): void {
    shown = false;
  }

  let shown = false;

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key == "Escape") {
      hide();
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if shown}
  <div class="modal-wrapper">
    <div class="modal" style={`background-color: ${backgroundColor}`}>
      <span class="close">
        <CloseButton on:click={() => hide()} />
      </span>
      <slot />
    </div>
  </div>
{/if}

<style>
  .modal-wrapper {
    display: flex;
    justify-content: center;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
  }

  .modal {
    align-self: center;
    background-color: white;
    position: relative;
    width: 70ch;
    max-height: 80vh;
    padding: 1rem;
    border-radius: 2px;
  }
  .close {
    position: absolute;
    top: 1vh;
    right: 1vh;
    line-height: 1rem;
  }
</style>
