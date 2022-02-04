import { writable } from "svelte/store";
import { Label, LabelColorType } from "./models/label";
import { v4 as uuidv4 } from "uuid";
import { List } from "./models/list";
import { Card } from "./models/card";
import { Just } from "@quanterall/lich";
import { Board } from "./models/board";

const board = Board(uuidv4(), "Georgi's Board", [
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
]);

// const board = {
//   name: "Georgi's Board",
//   lists: [
//     List(uuidv4(), "To Do", [
//       Card(uuidv4(), "Card 1", Just("This is a very important Card to do")),
//       Card(
//         uuidv4(),
//         "Card 2 well this is a little bit longer in terms of descriptions, but hey it's what it is yeah?"
//       ),
//       Card(
//         uuidv4(),
//         "Card 3 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo"
//       ),
//     ]),
//     List(uuidv4(), "In Progress", [
//       Card(uuidv4(), "Card 3", Just("Here is some description to be read")),
//       Card(uuidv4(), "Card 4"),
//     ]),
//     List(uuidv4(), "Done", [
//       Card(uuidv4(), "Card 5"),
//       Card(uuidv4(), "Card 6"),
//       Card(uuidv4(), "Card 7"),
//     ]),
//   ],
// };

const labels = [
  Label(uuidv4(), LabelColorType.Green, Just("test this is green")),
  Label(uuidv4(), LabelColorType.Yellow),
  Label(uuidv4(), LabelColorType.Orange),
  Label(uuidv4(), LabelColorType.Red),
  Label(uuidv4(), LabelColorType.Purple),
  Label(uuidv4(), LabelColorType.Blue),
  Label(uuidv4(), LabelColorType.LightBlue),
  Label(uuidv4(), LabelColorType.Gray),
];

const defaultLabels = [
  Label(uuidv4(), LabelColorType.Green),
  Label(uuidv4(), LabelColorType.Yellow),
  Label(uuidv4(), LabelColorType.Orange),
  Label(uuidv4(), LabelColorType.Red),
  Label(uuidv4(), LabelColorType.Purple),
  Label(uuidv4(), LabelColorType.Blue),
  Label(uuidv4(), LabelColorType.LightBlue),
  Label(uuidv4(), LabelColorType.Gray),
];

export const BoardStore = writable(board);
export const LabelStore = writable(labels);
export const DefaultLabelStore = writable(defaultLabels);
