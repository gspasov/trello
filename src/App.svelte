<script lang="ts">
	import { BoardStore } from "./stores";
	import { v4 as uuidv4 } from 'uuid';
	import * as types from "./types"
	import { slide } from 'svelte/transition';
	import Board from "./components/Board.svelte";

	let newListTitle = "";
	let isNewListSectionVisible = false;
	let inputRef: HTMLInputElement;

  function toggleAddListSectionVisibility(): void {
		isNewListSectionVisible = !isNewListSectionVisible;
		setTimeout(() => inputRef.focus(), 1);
  }	
	
	function createList():void {
		BoardStore.update((state) => {
			const newListId = uuidv4();
			
			return {
				...state,
				lists: [
					...state.lists,
					types.List(newListId, newListTitle, [])
				]
			}
		});
		
		newListTitle = "";
		isNewListSectionVisible = false;
	}
</script>

<main>
	<Board />
	<div>
		{#if isNewListSectionVisible}
			<div class="new-list-form" transition:slide={{ duration: 300 }}>
				<input type="text" name="card" placeholder="Enter list title..." bind:value={newListTitle} bind:this={inputRef}/>
				<button class="add-list" on:click={createList}>Add Card</button>
				<button class="close" on:click={toggleAddListSectionVisibility}>&times;</button>
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

	.add-list {
    background-color: #0079bf;
    border: none;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    cursor: pointer;
    border: 2px solid #0079bf;
    border-spacing: 20px;
		margin: 0px;
  }

  .add-list:hover {
    background-color: #026aa7;
    border: 2px solid #026aa7;
    color: #fff;
  }
  
  .add-list:focus {
    border: 2px solid #333;
  }

  .add-list:active {
    background-color: #055a8c;
  }

  .close {
    background: none;
    border: none;
    font-size: 16px;
    color: #999;
    cursor: pointer;
    margin: 0;
  }

	.close:hover {
    color: #555;
  }
</style>