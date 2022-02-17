<script lang="ts">
  import {
    Label,
    LabelColorType,
    labelColorTypeMapping,
  } from "../../models/label";
  import LabelBox from "../general/LabelBox.svelte";

  export let labels: Label[];
</script>

<div class="labels-section">
  <h5>Labels</h5>
  <div class="wrapper">
    {#each labels as label (label.id)}
      <LabelBox color={label.color}>
        {#if label.name.isJust()}
          {label.name.value}
        {/if}
      </LabelBox>
    {/each}
    <LabelBox
      selectable={true}
      color={labelColorTypeMapping(LabelColorType.AddBtnGray)}
    >
      <div class="add">&#x2715;</div>
    </LabelBox>
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

  .add {
    transform: rotate(135deg);
  }
</style>
