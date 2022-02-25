import { Just, Maybe, Nothing, nullableToMaybe } from "@quanterall/lich";
import { v4 as uuidv4 } from "uuid";
import type {
  AttachLabelToCardActionPayload,
  CreateCardActionPayload,
  DeleteCardActionPayload,
  DetachLabelFromCardActionPayload,
  EditCardDescriptionActionPayload,
  MarkCardAsDoneActionPayload,
  MarkCardAsUndonePayload,
  RemoveCardDueDateActionPayload,
  RenameCardActionPayload,
  SetCardDueDateActionPayload,
} from "../actions";
import type { UpdateBoardStore } from "../stores/workspaceStore";
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

export function processCreateCard({
  boardId,
  listId,
  title,
}: CreateCardActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCards(boards, boardId, listId, (cards: Card[]) => [
      ...cards,
      Card(uuidv4(), title),
    ]);
  };
}

export function processEditCardDescription({
  boardId,
  listId,
  cardId,
  description,
}: EditCardDescriptionActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
      ...card,
      description,
    }));
  };
}

export function processRenameCard({
  boardId,
  cardId,
  listId,
  title,
}: RenameCardActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
      ...card,
      title,
    }));
  };
}

export function processAttachLabelToCard({
  boardId,
  listId,
  cardId,
  labelId,
}: AttachLabelToCardActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
      ...card,
      labelIds: [...card.labelIds, labelId],
    }));
  };
}

export function processDetachLabelFromCard({
  boardId,
  listId,
  cardId,
  labelId,
}: DetachLabelFromCardActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
      ...card,
      labelIds: card.labelIds.filter((id) => id !== labelId),
    }));
  };
}

export function processSetCardDueDate({
  boardId,
  cardId,
  listId,
  dueDate,
}: SetCardDueDateActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
      ...card,
      dueDate,
    }));
  };
}

export function processRemoveCardDueDate({
  boardId,
  listId,
  cardId,
}: RemoveCardDueDateActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
      ...card,
      dueDate: Nothing(),
    }));
  };
}

export function processMarkCardAsDone({
  boardId,
  listId,
  cardId,
}: MarkCardAsDoneActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
      ...card,
      done: true,
    }));
  };
}

export function processMarkCardAsUndone({
  boardId,
  listId,
  cardId,
}: MarkCardAsUndonePayload): UpdateBoardStore {
  return (boards) => {
    return updateCard(boards, boardId, listId, cardId, (card: Card) => ({
      ...card,
      done: false,
    }));
  };
}

export function processDeleteCard({
  boardId,
  listId,
  cardId,
}: DeleteCardActionPayload): UpdateBoardStore {
  return (boards) => {
    return updateCards(boards, boardId, listId, (cards: Card[]) =>
      cards.filter((card) => card.id !== cardId)
    );
  };
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
