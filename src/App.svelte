<script lang="ts">
	import { slide } from 'svelte/transition';
	import Board from "./components/Board.svelte";
	import ActionClose from "./components/general/ActionClose.svelte";
	import { createList } from './models/list';

	let newListTitle = "";
	let isNewListSectionVisible = false;
	let inputRef: HTMLInputElement;

  function toggleAddListSectionVisibility(): void {
		isNewListSectionVisible = !isNewListSectionVisible;
		setTimeout(() => inputRef.focus(), 1);
  }	
	
	function handleCreateList():void {
		createList(newListTitle);
		
		newListTitle = "";
		isNewListSectionVisible = false;
	}
</script>

<main>
	<Board />
	<div>
		{#if isNewListSectionVisible}
			<div class="new-list-form" transition:slide={{ duration: 300 }}>
				<input type="text" name="list" placeholder="Enter list title..." bind:value={newListTitle} bind:this={inputRef}/>
				<ActionClose title={"Add list"} on:click={handleCreateList} on:close={toggleAddListSectionVisibility}/>
			</div>
		{:else}
			<div
			class="add-list-btn"
			class:hidden={isNewListSectionVisible} 
			on:click={toggleAddListSectionVisibility}
			>
				<span class="plus">+</span>Add another list
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		gap: .25rem;
	}

	.plus {
		font-size: 1.5em;
		line-height: 17px;
	}

	.hidden {
		display: none;
	}

	.add-list-btn {
		color: whitesmoke;
		background-color: #ffffff3d;
		width: 250px;
		padding: 10px 0px 10px 10px;
		border-radius: 3px;
		cursor: pointer;
		font-size: 14px;
		line-height: 20px;
	}

	.add-list-btn:hover {
		background-color: #ffffff4f;
	}

	.add-list-btn:active {
		background-color: #ffffff6f;
	}

	.new-list-form {
		background-color: #ebecf0;
		padding: 5px;
		border-radius: 3px;
	}

	input {
    display: block;
		padding: 5px;
		box-shadow: inset 0 0 0 2px #0079bf;
		border: none;
    font-size: 14px;
    width: 250px;
		height: 37px;
		padding-left: 10px;
		margin-bottom: 5px;
    color: #333;
    resize: none;
  }

  input:focus {
    outline: none;
  }
</style>