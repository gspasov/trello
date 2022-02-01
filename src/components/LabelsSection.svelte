<script lang="ts">
  import type * as types from "../types"

  export let labels: types.Label[]

</script>

<div class="labels-section">
  <h5>Labels</h5>
  <div class="wrapper">
    {#each labels as label (label.id)}
      <div class="label" style="background-color: {label.color};">{label.name ?? ""}</div>
    {/each}
    <div class="label add"><span>&#x2715;</span></div>
  </div>
</div>

<style>
  h5 {
    margin: 0px 0px 5px 0px;
    font-size: 12px;
    color: #5e6c84;
  }

  .labels-section {
    padding: 5px 0px;
  }

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .label {
    min-height: 20px;
    min-width: 18px;
    max-width: 100%;
    border-radius: 3px; 
    padding: 6px 12px;
    color: white;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .add {
    cursor: pointer;
    background-color: #091e420a;
  }
  .add > span {
    display: block;
    color: gray;
    line-height: 20px;
    transform: rotate(135deg);
  }

  .add:hover {
    background-color: #091e4211;
  }
</style>