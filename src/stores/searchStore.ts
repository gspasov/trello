import { Document, Id } from "flexsearch";
import { derived, writable } from "svelte/store";
import type { Board } from "../models/board";
import type { Card } from "../models/card";
import type { List } from "../models/list";
import { WorkspaceStore } from "./workspaceStore";

type SearchIndex = {
  board: Document<Board>;
  list: Document<List>;
  card: Document<Card>;
};

function SearchIndex(
  board: Document<Board>,
  list: Document<List>,
  card: Document<Card>
): SearchIndex {
  return { board, list, card };
}

let indexBoard = new Document<Board>({
  tokenize: "forward",
  document: { id: "id", index: ["name"] },
});

let indexList = new Document<List>({
  tokenize: "forward",
  document: { id: "id", index: ["title"] },
});

let indexCard = new Document<Card>({
  tokenize: "forward",
  document: { id: "id", index: ["title", "description:value"] },
});

const IndexBoardStore = writable(indexBoard);
const IndexListStore = writable(indexList);
const IndexCardStore = writable(indexCard);

export const SearchIndexStore = derived(
  [IndexBoardStore, IndexListStore, IndexCardStore],
  ([$boardIndex, $listIndex, $cardIndex]) => {
    return SearchIndex($boardIndex, $listIndex, $cardIndex);
  }
);

export function searchIndex<T>(searchTerm: string, index: Document<T>): Id[] {
  return index.search(searchTerm).reduce((acc, item) => {
    return [...acc, ...item.result];
  }, [] as Id[]);
}

export function findCards(boards: Board[], ids: Id[]): Card[] {
  return boards.reduce((acc, board) => {
    return [
      ...acc,
      ...board.lists.reduce((acc, list) => {
        return [...acc, ...list.cards.filter((card) => ids.includes(card.id))];
      }, [] as Card[]),
    ];
  }, [] as Card[]);
}

export function findLists(boards: Board[], ids: Id[]): List[] {
  return boards.reduce((acc, board) => {
    return [...acc, ...board.lists.filter((list) => ids.includes(list.id))];
  }, [] as List[]);
}

export function findBoards(boards: Board[], ids: Id[]): Board[] {
  return boards.filter((board) => ids.includes(board.id));
}

WorkspaceStore.subscribe((boards) => {
  boards.forEach((board) => {
    IndexBoardStore.update((index) => index.add(board));
    board.lists.forEach((list) => {
      IndexListStore.update((index) => index.add(list));
      list.cards.forEach((card) =>
        IndexCardStore.update((index) => index.add(card))
      );
    });
  });
});
