export type List = {
  id: string;
  name: string;
  cards: Card[];
  isMenuVisible: boolean;
};

export function List(id: string, name: string, cards: Card[]): List {
  return {
    id,
    name,
    cards,
    isMenuVisible: false,
  };
}

export type Card = {
  id: string;
  title: string;
  done: boolean;
  description?: string;
  assignedTo?: string;
  dueDate?: Date;
};

export function Card(
  id: string,
  title: string,
  done: boolean,
  description?: string,
  assignedTo?: string,
  dueDate?: Date
): Card {
  return {
    id,
    title,
    done,
    description,
    assignedTo,
    dueDate,
  };
}
