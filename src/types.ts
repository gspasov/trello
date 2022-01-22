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

export type Card = {
  id: string;
  title: string;
  description?: string;
  assignedTo?: string;
  dueDate?: Date;
};

export function Card(
  id: string,
  title: string,
  description?: string,
  assignedTo?: string,
  dueDate?: Date
): Card {
  return {
    id,
    title,
    description,
    assignedTo,
    dueDate,
  };
}
