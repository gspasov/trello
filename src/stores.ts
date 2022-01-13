import { writable } from "svelte/store";
import { List, Card } from "./types";
import { v4 as uuidv4 } from "uuid";

const list1Id = uuidv4();
const list2Id = uuidv4();
const list3Id = uuidv4();
const board = {
  name: "Georgi's Board",
  lists: [
    List(list1Id, "To Do", [
      Card(uuidv4(), "Card 1", false, "This is a very important Card to do"),
      Card(
        uuidv4(),
        "Card 2 well this is a little bit longer in terms of descriptions, but hey it's what it is yeah?",
        false
      ),
      Card(
        uuidv4(),
        "Card 3 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
      Card(
        uuidv4(),
        "Card 4 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
      Card(
        uuidv4(),
        "Card 5 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
      Card(
        uuidv4(),
        "Card 3 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
      Card(
        uuidv4(),
        "Card 4 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
      Card(
        uuidv4(),
        "Card 5 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
      Card(
        uuidv4(),
        "Card 3 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
      Card(
        uuidv4(),
        "Card 4 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
      Card(
        uuidv4(),
        "Card 5 this will be even longer, but this test requires some long text, so this is what we'll need to do at this point!! yo",
        false
      ),
    ]),
    List(list2Id, "In Progress", [
      Card(uuidv4(), "Card 3", false),
      Card(uuidv4(), "Card 4", true),
    ]),
    List(list3Id, "Done", [
      Card(uuidv4(), "Card 5", true),
      Card(uuidv4(), "Card 6", true),
      Card(uuidv4(), "Card 7", true),
    ]),
  ],
};

export const BoardStore = writable(board);
