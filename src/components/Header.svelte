<script lang="ts">
  import { boardColorTypeDarkMapping } from "../models/board";
  import { BoardsStore } from "../stores";

  $: boards = $BoardsStore;
  $: backgroundColor = boardColorTypeDarkMapping(
    boards.find((b) => b.selected).color.type
  );
</script>

<div style="background-color: {backgroundColor}">
  <span>Quantrello</span>
</div>

<style>
  div {
    position: fixed;
    display: flex;
    top: 0;
    height: 45px;
    width: 100%;
    box-shadow: 0px -4px 10px #555555;
    padding: 0px 16px;
    transition: 0.3s;
  }
  span {
    align-self: center;
    font-size: 20px;
    color: white;
    font-weight: 800;
  }
</style>
