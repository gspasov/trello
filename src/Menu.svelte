<script lang="ts">
import { createEventDispatcher } from "svelte"
import Divider from "./Divider.svelte";

export let x = 0;
export let y = 0;

const dispatch = createEventDispatcher();
</script>

<div class="list-context-menu" style="top: {y}px; left: {x}px;">
    <div class="title-section">
        <span></span>
        <span class="title">List actions</span>
        <span class="close-btn" on:click={() => dispatch("close")}>&#10006;</span>
    </div>
    <Divider />
    <slot/>
</div>

<style>
.list-context-menu {
  position: absolute;
  background: white;
  width: 250px;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
  z-index: 1;
  padding: 5px 0px 5px 0px;
}

.title-section {
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
}

.title {
  align-self: center;
  font-size: 14px;
}

.close-btn {
  align-self: center;
  cursor: pointer;
  padding: 5px;
  color: #555;
}

.close-btn:hover {
  color: #aaa;
}
</style>
