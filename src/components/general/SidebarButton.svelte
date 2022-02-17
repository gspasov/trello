<script lang="ts">
  export let move = false;
  let hover = false;

  function toggleHover(): void {
    hover = !hover;
  }
</script>

<div
  class:move
  class:hover
  on:click
  on:mouseenter={toggleHover}
  on:mouseleave={toggleHover}
>
  <span class:hover class:rotate-to-left={move} class:rotate-to-right={!move}
    >&#10132;</span
  >
</div>

<style>
  span {
    position: fixed;
    top: 10px;
    height: 24px;
    width: 24px;
    line-height: 23px;
    background-color: #eeeeee44;
    color: white;
    text-align: center;
    border-radius: 100px;
    transition: 0.3s fade;
  }

  div {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 12px;
    transition: 0.3s;
    cursor: pointer;
    z-index: 2;
    background-color: #eeeeee44;
  }

  .hover {
    background-color: #eeeeee99;
  }

  .move {
    transform: translateX(250px);
  }

  .rotate-to-left {
    transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    transition: transform 500ms ease;
    -moz-transition: -moz-transform 500ms ease;
    -ms-transition: -ms-transform 500ms ease;
    -o-transition: -o-transform 500ms ease;
    -webkit-transition: -webkit-transform 500ms ease;
  }

  .rotate-to-right {
    transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
    transition: transform 500ms ease;
    -moz-transition: -moz-transform 500ms ease;
    -ms-transition: -ms-transform 500ms ease;
    -o-transition: -o-transform 500ms ease;
    -webkit-transition: -webkit-transform 500ms ease;
  }
</style>
