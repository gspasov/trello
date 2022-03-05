import { Maybe, Nothing, nullableToMaybe } from "@quanterall/lich";
import { v4 as uuidv4 } from "uuid";
import type {
  AttachLabelToCardEventPayload,
  CreateCardEventPayload,
  DeleteCardEventPayload,
  DetachLabelFromCardEventPayload,
  EditCardDescriptionEventPayload,
  MarkCardAsDoneEventPayload,
  MarkCardAsUndonePayload,
  RemoveCardDueDateEventPayload,
  RenameCardEventPayload,
  SetCardDueDateEventPayload,
} from "../events";
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

export function processCreateCard(
  boards: Board[],
  { boardId, listId, title }: CreateCardEventPayload
): Board[] {
  return updateCards(boards, boardId, listId, (cards: Card[]) => [
    ...cards,
    Card(uuidv4(), title),
  ]);
}

export function processEditCardDescription(
  boards: Board[],
  { boardId, listId, cardId, description }: EditCardDescriptionEventPayload
): Board[] {
  return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
    ...card,
    description,
  }));
}

export function processRenameCard(
  boards: Board[],
  { boardId, cardId, listId, title }: RenameCardEventPayload
): Board[] {
  return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
    ...card,
    title,
  }));
}

export function processAttachLabelToCard(
  boards: Board[],
  { boardId, listId, cardId, labelId }: AttachLabelToCardEventPayload
): Board[] {
  return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
    ...card,
    labelIds: [...card.labelIds, labelId],
  }));
}

export function processDetachLabelFromCard(
  boards: Board[],
  { boardId, listId, cardId, labelId }: DetachLabelFromCardEventPayload
): Board[] {
  return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
    ...card,
    labelIds: card.labelIds.filter((id) => id !== labelId),
  }));
}

export function processSetCardDueDate(
  boards: Board[],
  { boardId, cardId, listId, dueDate }: SetCardDueDateEventPayload
): Board[] {
  return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
    ...card,
    dueDate,
  }));
}

export function processRemoveCardDueDate(
  boards: Board[],
  { boardId, listId, cardId }: RemoveCardDueDateEventPayload
): Board[] {
  return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
    ...card,
    dueDate: Nothing(),
  }));
}

export function processMarkCardAsDone(
  boards: Board[],
  { boardId, listId, cardId }: MarkCardAsDoneEventPayload
): Board[] {
  return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
    ...card,
    done: true,
  }));
}

export function processMarkCardAsUndone(
  boards: Board[],
  { boardId, listId, cardId }: MarkCardAsUndonePayload
): Board[] {
  return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
    ...card,
    done: false,
  }));
}

export function processDeleteCard(
  boards: Board[],
  { boardId, listId, cardId }: DeleteCardEventPayload
): Board[] {
  return updateCards(boards, boardId, listId, (cards: Card[]) =>
    cards.filter((card) => card.id !== cardId)
  );
}

function updateCard(
  boards: Board[],
  boardId: string,
  listId: string,
  cardId: string,
  cardUpdater: (card: Card) => Card
): Board[] {
  return updateCards(boards, boardId, listId, (cards) =>
    cards.map((card) => {
      if (card.id !== cardId) return card;

      return cardUpdater(card);
    })
  );
}

function updateCards(
  boards: Board[],
  boardId: string,
  listId: string,
  cardsUpdater: (cards: Card[]) => Card[]
): Board[] {
  return boards.map((board) => {
    if (board.id !== boardId) return board;

    return {
      ...board,
      lists: board.lists.map((list) => {
        if (list.id !== listId) return list;

        return {
          ...list,
          cards: cardsUpdater(list.cards),
        };
      }),
    };
  });
}

export function getLabels(
  boards: Board[],
  boardId: string,
  listId: string,
  cardId: string
): Label[] {
  const boardLabels = nullableToMaybe(boards.find((b) => b.id === boardId)).map(
    (b) => b.labels
  );

  const cardLabelIds = nullableToMaybe(boards.find((b) => b.id === boardId))
    .bind((b) => nullableToMaybe(b.lists.find((l) => l.id === listId)))
    .bind((l) => nullableToMaybe(l.cards.find((c) => c.id === cardId)))
    .map((c) => c.labelIds);

  return boardLabels
    .otherwise([])
    .filter((l) => cardLabelIds.otherwise([]).includes(l.id));
}
