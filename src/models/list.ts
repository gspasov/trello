import { v4 as uuidv4 } from "uuid";
import { BoardsStore } from "../stores";
import type { Card } from "./card";

export type List = {
  id: string;
  name: string;
  cards: Card[];
  isMenuOpened: boolean;
};

export function List(id: string, name: string, cards: Card[]): List {
  return {
    id,
    name,
    cards,
    isMenuOpened: false,
  };
}

export function createList(boardId: string, title: string): void {
  BoardsStore.update((state) => {
    const newListId = uuidv4();

    return state.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: [...board.lists, List(newListId, title, [])],
      };
    });
  });
}

export function updateList(boardId: string, id: string, newList: List): void {
  BoardsStore.update((store) => {
    return store.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: board.lists.map((list) => {
          if (list.id !== id) return list;

          return newList;
        }),
      };
    });
  });
}

export function updateLists(boardId: string, newLists: List[]): void {
  BoardsStore.update((store) => {
    return store.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: newLists,
      };
    });
  });
}

export function deleteList(boardId: string, id: string): void {
  BoardsStore.update((store) => {
    return store.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: board.lists.filter((list) => list.id !== id),
      };
    });
  });
}

export function openListMenu(boardId: string, id: string): void {
  BoardsStore.update((store) => {
    return store.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: board.lists.map((list) => {
          if (list.id !== id) return list;

          return { ...list, isMenuOpened: true };
        }),
      };
    });
  });
}

export function closeListMenu(boardId: string): void {
  BoardsStore.update((store) => {
    return store.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: board.lists.map((list) => ({ ...list, isMenuOpened: false })),
      };
    });
  });
}
