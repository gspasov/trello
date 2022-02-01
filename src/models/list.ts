import { v4 as uuidv4 } from "uuid";
import { BoardStore } from "../stores";
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

export function createList(title: string): void {
  BoardStore.update((state) => {
    const newListId = uuidv4();

    return {
      ...state,
      lists: [...state.lists, List(newListId, title, [])],
    };
  });
}

export function updateList(id: string, newList: List): void {
  BoardStore.update((store) => {
    return {
      ...store,
      lists: store.lists.map((list) => {
        if (list.id !== id) return list;

        return newList;
      }),
    };
  });
}

export function updateLists(newLists: List[]): void {
  BoardStore.update((store) => {
    return {
      ...store,
      lists: newLists,
    };
  });
}

export function deleteList(id: string): void {
  BoardStore.update((store) => {
    return {
      ...store,
      lists: store.lists.filter((list) => list.id !== id),
    };
  });
}

export function openListMenu(id: string): void {
  BoardStore.update((store) => {
    return {
      ...store,
      lists: store.lists.map((list) => {
        if (list.id !== id) return { ...list, isMenuOpened: false };

        return { ...list, isMenuOpened: true };
      }),
    };
  });
}

export function closeListMenu(): void {
  BoardStore.update((store) => {
    return {
      ...store,
      lists: store.lists.map((list) => ({ ...list, isMenuOpened: false })),
    };
  });
}
