import { writable } from "svelte/store";
import { Board, BoardColor, BoardColorType } from "../models/board";
import { v4 as uuidv4 } from "uuid";
import { List } from "../models/list";
import { Card } from "../models/card";
import { Just } from "@quanterall/lich";
import { defaultLabels } from "../models/label";

const testingBoard = Board(
  uuidv4(),
  "Georgi's Board",
  [
    List(uuidv4(), "To Do", [
      Card(uuidv4(), "Card 1", Just("This is a very important Card to do")),
      Card(
        uuidv4(),
        "Card 2 well this is a little bit longer in terms of descriptions, but hey it's what it is yeah?"
      ),
      Card(
        uuidv4(),
        "Card 3 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo"
      ),
    ]),
    List(uuidv4(), "In Progress", [
      Card(uuidv4(), "Card 3", Just("Here is some description to be read")),
      Card(uuidv4(), "Card 4"),
    ]),
    List(uuidv4(), "Done", [
      Card(uuidv4(), "Card 5"),
      Card(uuidv4(), "Card 6"),
      Card(uuidv4(), "Card 7"),
    ]),
  ],
  defaultLabels(),
  BoardColor(uuidv4(), BoardColorType.Orange),
  true
);

const workspace: Board[] = [testingBoard];
export const WorkspaceStore = writable(workspace);

export type UpdateBoardStore = (boards: Board[]) => Board[];

export function updateWorkspace(newBoards: Board) {
  WorkspaceStore.update((boards) => {
    return [...boards, newBoards];
  });
}
