import { writable } from "svelte/store";
import {
  BlueLabel,
  GrayLabel,
  GreenLabel,
  LightBlueLabel,
  OrangeLabel,
  PurpleLabel,
  RedLabel,
  YellowLabel,
} from "./models/label";
import { v4 as uuidv4 } from "uuid";
import { List } from "./models/list";
import { Card } from "./models/card";

const board = {
  name: "Georgi's Board",
  lists: [
    List(uuidv4(), "To Do", [
      Card(uuidv4(), "Card 1", "This is a very important Card to do"),
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
      Card(uuidv4(), "Card 3", "Here is some description to be read"),
      Card(uuidv4(), "Card 4"),
    ]),
    List(uuidv4(), "Done", [
      Card(uuidv4(), "Card 5"),
      Card(uuidv4(), "Card 6"),
      Card(uuidv4(), "Card 7"),
    ]),
  ],
};

const labels = [
  GreenLabel(uuidv4(), "test this is green"),
  YellowLabel(uuidv4()),
  OrangeLabel(uuidv4()),
  RedLabel(uuidv4()),
  PurpleLabel(uuidv4()),
  BlueLabel(uuidv4()),
  LightBlueLabel(uuidv4()),
  GrayLabel(uuidv4()),
];

const defaultLabels = [
  GreenLabel(uuidv4()),
  YellowLabel(uuidv4()),
  OrangeLabel(uuidv4()),
  RedLabel(uuidv4()),
  PurpleLabel(uuidv4()),
  BlueLabel(uuidv4()),
  LightBlueLabel(uuidv4()),
  GrayLabel(uuidv4()),
];

export const BoardStore = writable(board);
export const LabelStore = writable(labels);
export const DefaultLabelStore = writable(defaultLabels);
