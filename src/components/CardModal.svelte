<script lang="ts">
  import type * as types from "../types"
  
  export let card: types.Card;
  export let list: types.List;
</script>

<div>
  <h3>{card.title}</h3>
  <span>in list {list.name}</span>
  <p>Modal content.</p>
</div>

<style>
  h3 {
    margin: 0;
  }
</style>