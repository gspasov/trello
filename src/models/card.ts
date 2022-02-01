export type Card = {
  id: string;
  title: string;
  labelIds: string[];
  completed: boolean;
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
    labelIds: [],
    completed: false,
    description,
    assignedTo,
    dueDate,
  };
}
