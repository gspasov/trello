import { writable } from "svelte/store";
import { defaultLabels } from "./models/label";
import { v4 as uuidv4 } from "uuid";
import { List } from "./models/list";
import { Card } from "./models/card";
import { Just } from "@quanterall/lich";
import { Board, BoardColor, BoardColorType } from "./models/board";

const labels = defaultLabels();

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
  labels,
  BoardColor(uuidv4(), BoardColorType.Orange),
  true
);

const boards = [testingBoard];

const boardColors = [
  BoardColor(uuidv4(), BoardColorType.Green),
  BoardColor(uuidv4(), BoardColorType.LightGreen),
  BoardColor(uuidv4(), BoardColorType.Orange),
  BoardColor(uuidv4(), BoardColorType.Red),
  BoardColor(uuidv4(), BoardColorType.Purple),
  BoardColor(uuidv4(), BoardColorType.Pink),
  BoardColor(uuidv4(), BoardColorType.Blue),
  BoardColor(uuidv4(), BoardColorType.LightBlue),
  BoardColor(uuidv4(), BoardColorType.Gray),
];

const backgroundColor = "#00AECC";

export const BoardsStore = writable(boards);
export const BoardColors = writable(boardColors);
export const DefaultLabelStore = writable(labels);
export const BackgroundColor = writable(backgroundColor);
