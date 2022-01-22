import { writable } from "svelte/store";
import { List, Card } from "./types";
import { v4 as uuidv4 } from "uuid";

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
      Card(uuidv4(), "Card 3"),
      Card(uuidv4(), "Card 4"),
    ]),
    List(uuidv4(), "Done", [
      Card(uuidv4(), "Card 5"),
      Card(uuidv4(), "Card 6"),
      Card(uuidv4(), "Card 7"),
    ]),
  ],
};

export const BoardStore = writable(board);
