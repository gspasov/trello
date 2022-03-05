import { Just } from "@quanterall/lich";
import { get, Writable, writable } from "svelte/store";
import { EventType } from "../events";
import { History, Snapshot } from "../models/history";
import { WorkspaceStore } from "./workspaceStore";

export const HistoryStore: Writable<History> = writable(
  History(Just(0), [
    Snapshot(EventType.CreateBoard, get(WorkspaceStore), new Date()),
  ])
);
HistoryStore.subscribe((history) => {
  if (history.pointer.isJust()) {
    WorkspaceStore.set(history.snapshots[history.pointer.value].state);
  }
});
