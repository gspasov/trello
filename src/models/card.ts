import { Maybe, Nothing } from "@quanterall/lich";
import { v4 as uuidv4 } from "uuid";
import { BoardStore } from "../stores";
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

export function createCard(listId: string, title: string): void {
  BoardStore.update((state) => {
    const newCardId = uuidv4();
    return {
      ...state,
      lists: state.lists.map((l) => {
        if (listId !== l.id) return l;

        return {
          ...l,
          cards: [...l.cards, Card(newCardId, title)],
        };
      }),
    };
  });
}

export function updateCard(id: string, listId: string, newCard: Card): void {
  BoardStore.update((state) => {
    return {
      ...state,
      lists: state.lists.map((l) => {
        if (listId !== l.id) return l;

        return {
          ...l,
          cards: l.cards.map((c) => {
            if (id !== c.id) return c;

            return newCard;
          }),
        };
      }),
    };
  });
}

export function deleteCard(id: string, listId: string): void {
  BoardStore.update((state) => {
    return {
      ...state,
      lists: state.lists.map((l) => {
        if (listId !== l.id) return l;

        return {
          ...l,
          cards: l.cards.filter((c) => c.id !== id),
        };
      }),
    };
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
