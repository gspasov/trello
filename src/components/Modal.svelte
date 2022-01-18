<script lang="ts">
  import { clickOutside } from "../clickOutside"

  let shown = false;
  let clickedAmountsOutside = 0;
  export function show(): void {
    shown = true;
  }
  export function hide(): void {
    shown = false;
    clickedAmountsOutside = 0;
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key == 'Escape') {
      hide();
    }
  }

  function handleOutsideClick(): void {
    clickedAmountsOutside++;
    if (clickedAmountsOutside >= 2) hide();
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if shown}
  <div class="modal-wrapper">
    <div class="modal" use:clickOutside={handleOutsideClick}>
      <span class="close" on:click={() => hide()}>&times;</span>
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
  }
  
  .modal {
    align-self: center;
    background-color: white;
    width: 55ch;
    min-height: 65vh;
    max-height: 80vh;
    padding: 1rem;
    border-radius: 2px;
  }
  .close {
    color: #444;
    float: right;
    cursor: pointer;
    font-size: 1.50rem;
    line-height: 1rem;
  }
  .close:hover {
    color: grey
  }
</style>