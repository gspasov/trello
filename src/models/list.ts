import { v4 as uuidv4 } from "uuid";
import type {
  CloseListMenuEventPayload,
  CreateListEventPayload,
  DeleteAllCardsFromListEventPayload,
  DeleteListEventPayload,
  MoveCardEventPayload,
  MoveListEventPayload,
  OpenListMenuEventPayload,
  RenameListEventPayload,
} from "../events";
import type { Board } from "./board";
import type { Card } from "./card";

export type List = {
  id: string;
  title: string;
  cards: Card[];
  isMenuOpened: boolean;
};

export function List(id: string, title: string, cards: Card[]): List {
  return {
    id,
    title,
    cards,
    isMenuOpened: false,
  };
}

export function processCreateList(
  boards: Board[],
  { boardId, title }: CreateListEventPayload
): Board[] {
  return updateLists(boards, boardId, (lists) => [
    ...lists,
    List(uuidv4(), title, []),
  ]);
}

export function processRenameList(
  boards: Board[],
  { boardId, listId, title }: RenameListEventPayload
): Board[] {
  return updateList(boards, boardId, listId, (list) => ({
    ...list,
    title,
  }));
}

export function processMoveList(
  boards: Board[],
  { boardId, lists }: MoveListEventPayload
): Board[] {
  return updateLists(boards, boardId, (_) => lists);
}

export function processMoveCard(
  boards: Board[],
  { boardId, listId, cards }: MoveCardEventPayload
): Board[] {
  return updateList(boards, boardId, listId, (list) => ({
    ...list,
    cards,
  }));
}

export function processDeleteAllCardsFromList(
  boards: Board[],
  { boardId, listId }: DeleteAllCardsFromListEventPayload
): Board[] {
  return updateList(boards, boardId, listId, (list) => ({
    ...list,
    cards: [],
  }));
}

export function processDeleteList(
  boards: Board[],
  { boardId, listId }: DeleteListEventPayload
): Board[] {
  return updateLists(boards, boardId, (lists) =>
    lists.filter((list) => list.id !== listId)
  );
}

export function processOpenListMenu(
  boards: Board[],
  { boardId, listId }: OpenListMenuEventPayload
): Board[] {
  return updateList(boards, boardId, listId, (list) => ({
    ...list,
    isMenuOpened: true,
  }));
}

export function processCloseListMenu(
  boards: Board[],
  { boardId, listId }: CloseListMenuEventPayload
): Board[] {
  return updateList(boards, boardId, listId, (list) => ({
    ...list,
    isMenuOpened: false,
  }));
}

function updateList(
  boards: Board[],
  boardId: string,
  listId: string,
  listUpdater: (list: List) => List
): Board[] {
  return updateLists(boards, boardId, (lists) =>
    lists.map((list) => {
      if (list.id !== listId) return list;

      return listUpdater(list);
    })
  );
}

function updateLists(
  boards: Board[],
  boardId: string,
  listsUpdater: (lists: List[]) => List[]
): Board[] {
  return boards.map((board) => {
    if (board.id !== boardId) return board;

    return {
      ...board,
      lists: listsUpdater(board.lists),
    };
  });
}
