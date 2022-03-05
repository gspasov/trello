import { derived, readable, Readable } from "svelte/store";
import { Board, BoardColor, BoardColorType } from "../models/board";
import type { History } from "../models/history";
import { defaultLabels, Label } from "../models/label";
import { HistoryStore } from "./historyStore";
import { WorkspaceStore } from "./workspaceStore";
import { v4 as uuidv4 } from "uuid";

export type State = {
  history: History;
  boards: Board[];
  labels: Label[];
  boardColors: BoardColor[];
};

export function State(
  history: History,
  boards: Board[],
  labels: Label[],
  boardColors: BoardColor[]
): State {
  return { history, boards, labels, boardColors };
}

const DefaultLabelColorsStore: Readable<Label[]> = readable(defaultLabels());
const DefaultBoardColorsStore: Readable<BoardColor[]> = readable([
  BoardColor(uuidv4(), BoardColorType.Green),
  BoardColor(uuidv4(), BoardColorType.LightGreen),
  BoardColor(uuidv4(), BoardColorType.Orange),
  BoardColor(uuidv4(), BoardColorType.Red),
  BoardColor(uuidv4(), BoardColorType.Purple),
  BoardColor(uuidv4(), BoardColorType.Pink),
  BoardColor(uuidv4(), BoardColorType.Blue),
  BoardColor(uuidv4(), BoardColorType.LightBlue),
  BoardColor(uuidv4(), BoardColorType.Gray),
]);

export const StateStore: Readable<State> = derived(
  [
    HistoryStore,
    WorkspaceStore,
    DefaultLabelColorsStore,
    DefaultBoardColorsStore,
  ],
  ([$history, $workspace, $labels, $boardColors]) => {
    return State($history, $workspace, $labels, $boardColors);
  }
);
