import { Just, Maybe, Nothing } from "@quanterall/lich";
import type { EventType, UpdateHistoryEventPayload } from "../events";
import type { Board } from "./board";

export type History = {
  pointer: Maybe<number>;
  snapshots: Snapshot[];
};

export type Snapshot = {
  action: EventType;
  state: Board[];
  changedOn: Date;
};

export function History(
  pointer: Maybe<number>,
  snapshots: Snapshot[]
): History {
  return { pointer, snapshots };
}

export function Snapshot(
  action: EventType,
  state: Board[],
  changedOn: Date
): Snapshot {
  return {
    action,
    state,
    changedOn,
  };
}

export function processUndo(history: History): History {
  return {
    ...history,
    pointer: history.pointer.map((pointer) =>
      pointer === 0 ? pointer : pointer - 1
    ),
  };
}

export function processRedo(history: History): History {
  return {
    ...history,
    pointer: history.pointer.map((pointer) =>
      pointer === history.snapshots.length - 1 ? pointer : pointer + 1
    ),
  };
}

export function processUpdateHistory(
  history: History,
  { boards, eventType }: UpdateHistoryEventPayload
): History {
  const newSnapshots = [
    ...history.snapshots.slice(0, history.pointer.otherwise(0) + 1),
    Snapshot(eventType, boards, new Date()),
  ];
  const pointer: Maybe<number> =
    newSnapshots.length === 0 ? Nothing() : Just(newSnapshots.length - 1);

  return History(pointer, newSnapshots);
}
