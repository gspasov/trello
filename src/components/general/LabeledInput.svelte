<script lang="ts">
  import { Maybe, Nothing } from "@quanterall/lich";

  export let ref: HTMLInputElement = undefined;
  export let title: Maybe<string> = Nothing();
  export let required: boolean = false;
  export let invalid: boolean = false;
  export let value: string;
</script>

{#if title.isJust()}
  <span>{title.value}</span>
  {#if required}
    <span class="required">*</span>
  {/if}
{/if}
<input
  class:invalid
  class="input-primary"
  name="label"
  bind:this={ref}
  bind:value
/>

<style>
  span {
    display: inline-block;
    color: #5e6c84;
    font-size: 12px;
    font-weight: 600;
  }

  .required {
    color: #eb5a46;
  }

  .invalid {
    box-shadow: inset 0 0 0 2px #eb5a46;
  }
</style>
