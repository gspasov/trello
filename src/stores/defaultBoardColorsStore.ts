import { readable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import { BoardColor, BoardColorType } from "../models/board";

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

export const DefaultBoardColorsStore = readable(boardColors);
