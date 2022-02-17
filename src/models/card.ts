import { Maybe, Nothing } from "@quanterall/lich";
import { v4 as uuidv4 } from "uuid";
import { BoardsStore } from "../stores";
import type { Board } from "./board";
import type { Label } from "./label";

export type Card = {
  id: string;
  title: string;
  labelIds: string[];
  completed: boolean;
  description: Maybe<string>;
  assignedTo: Maybe<string>;
  dueDate: Maybe<Date>;
};

export function Card(
  id: string,
  title: string,
  description: Maybe<string> = Nothing(),
  assignedTo: Maybe<string> = Nothing(),
  dueDate: Maybe<Date> = Nothing()
): Card {
  return {
    id,
    title,
    labelIds: [],
    completed: false,
    description,
    assignedTo,
    dueDate,
  };
}

export function createCard(
  boardId: string,
  listId: string,
  title: string
): void {
  BoardsStore.update((state) => {
    const newCardId = uuidv4();

    return state.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: board.lists.map((list) => {
          if (list.id !== listId) return list;

          return {
            ...list,
            cards: [...list.cards, Card(newCardId, title)],
          };
        }),
      };
    });
  });
}

export function updateCard(
  id: string,
  boardId: string,
  listId: string,
  newCard: Card
): void {
  BoardsStore.update((state) => {
    return state.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: board.lists.map((list) => {
          if (list.id !== listId) return list;

          return {
            ...list,
            cards: list.cards.map((card) => {
              if (card.id !== id) return card;

              return newCard;
            }),
          };
        }),
      };
    });
  });
}

export function deleteCard(id: string, boardId: string, listId: string): void {
  BoardsStore.update((state) => {
    return state.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        lists: board.lists.map((list) => {
          if (list.id !== listId) return list;

          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== id),
          };
        }),
      };
    });
  });
}

export function updateCardLabel(card: Card, label: Label): Card {
  return {
    ...card,
    labelIds: card.labelIds.includes(label.id)
      ? card.labelIds.filter((id) => id !== label.id)
      : [...card.labelIds, label.id],
  };
}

export function getLabels(
  boards: Board[],
  boardId: string,
  listId: string,
  cardId: string
): Label[] {
  const boardLabels = boards.find((b) => b.id === boardId).labels;
  const cardLabelIds = boards
    .find((b) => b.id === boardId)
    .lists.find((l) => l.id === listId)
    .cards.find((c) => c.id === cardId).labelIds;

  return boardLabels.filter((l) => cardLabelIds.includes(l.id));
}
