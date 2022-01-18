<script lang="ts">
  import type * as types from "../types"
  export let card: types.Card;
</script>

<div>
  <h3>{card.title}</h3>
  <p>Modal content.</p>
</div>

<style>
  h3 {
    margin: 0;
  }
</style>