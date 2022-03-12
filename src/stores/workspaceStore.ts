import { Writable, writable } from "svelte/store";
import { Board, BoardColor, BoardColorType } from "../models/board";
import { v4 as uuidv4 } from "uuid";
import { List } from "../models/list";
import { Card } from "../models/card";
import { Just, Nothing, nullableToEither } from "@quanterall/lich";
import { defaultLabels } from "../models/label";
import { validatorToEither } from "../utilities";
import { validateWorkspace } from "../validators";

const WORKSPACE_LOCAL_STORAGE_KEY = "quantrello_workspace";

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

const localWorkspace = nullableToEither(
  localStorage.getItem(WORKSPACE_LOCAL_STORAGE_KEY),
  "No workspace found in local storage"
)
  .map(JSON.parse)
  .bind((value) => validatorToEither(validateWorkspace, JSON.stringify)(value))
  .map((boards) =>
    boards.map((board) => {
      return Board(
        board.id,
        board.name,
        board.lists.map((list) => {
          return List(
            list.id,
            list.title,
            list.cards.map((card) => {
              return Card(
                card.id,
                card.title,
                card.description.type === "Just"
                  ? Just(card.description.value)
                  : Nothing(),
                card.labelIds,
                card.completed,
                card.assignedTo.type === "Just"
                  ? Just(card.assignedTo.value)
                  : Nothing(),
                card.dueDate.type === "Just"
                  ? Just(new Date(card.dueDate.value))
                  : Nothing()
              );
            }),
            list.isMenuOpened
          );
        }),
        board.labels,
        board.color,
        board.selected,
        board.favorite
      );
    })
  )
  .onLeft((e) =>
    console.error("Failed to validate Boards from local storage: ", e)
  )
  .otherwise([]);

export const WorkspaceStore: Writable<Board[]> = writable(localWorkspace);

WorkspaceStore.subscribe((boards) => {
  localStorage.setItem(WORKSPACE_LOCAL_STORAGE_KEY, JSON.stringify(boards));
});
