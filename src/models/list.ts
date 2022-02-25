import { v4 as uuidv4 } from "uuid";
import type {
  CloseListMenuActionPayload,
  CreateListActionPayload,
  DeleteAllCardsFromListActionPayload,
  DeleteListActionPayload,
  MoveCardActionPayload,
  MoveListActionPayload,
  OpenListMenuActionPayload,
  RenameListActionPayload,
} from "../actions";
import type { UpdateBoardStore } from "../stores/workspaceStore";
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

export function processCreateList({
  boardId,
  title,
}: CreateListActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateLists(boards, boardId, (lists) => [
      ...lists,
      List(uuidv4(), title, []),
    ]);
  };
}

export function processRenameList({
  boardId,
  listId,
  title,
}: RenameListActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateList(boards, boardId, listId, (list) => ({
      ...list,
      title,
    }));
  };
}

export function processMoveList({
  boardId,
  lists,
}: MoveListActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateLists(boards, boardId, (_) => lists);
  };
}

export function processMoveCard({
  boardId,
  listId,
  cards,
}: MoveCardActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateList(boards, boardId, listId, (list) => ({
      ...list,
      cards,
    }));
  };
}

export function processDeleteAllCardsFromList({
  boardId,
  listId,
}: DeleteAllCardsFromListActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateList(boards, boardId, listId, (list) => ({
      ...list,
      cards: [],
    }));
  };
}

export function processDeleteList({
  boardId,
  listId,
}: DeleteListActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateLists(boards, boardId, (lists) =>
      lists.filter((list) => list.id !== listId)
    );
  };
}

export function processOpenListMenu({
  boardId,
  listId,
}: OpenListMenuActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateList(boards, boardId, listId, (list) => ({
      ...list,
      isMenuOpened: true,
    }));
  };
}

export function processCloseListMenu({
  boardId,
  listId,
}: CloseListMenuActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateList(boards, boardId, listId, (list) => ({
      ...list,
      isMenuOpened: false,
    }));
  };
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
