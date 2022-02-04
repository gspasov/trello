import type { List } from "./list";

export type Board = {
  id: string;
  name: string;
  lists: List[];
};

export function Board(id: string, name: string, lists: List[]): Board {
  return {
    id,
    name,
    lists,
  };
}
