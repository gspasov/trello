export type DefaultMouseEvent = MouseEvent & {
  currentTarget: EventTarget & HTMLElement;
};

export interface DispatchDueDatePosition {
  openDueDate: Coordinates;
}

export interface DispatchCompleted {
  toggleCompleted: DispatchCompletedPayload;
}

export interface DispatchCompletedPayload {
  completed: boolean;
}

export interface Coordinates {
  x: number;
  y: number;
}

export enum CardModalMenus {
  DUE_DATE = "dueDate",
  LABELS = "labels",
  LABEL_CREATE = "labelCreate",
  LABEL_EDIT = "labelEdit",
  LABEL_DELETE = "labelDelete",
  MOVE = "move",
}

export interface CardModalMenusVisibility {
  dueDate: boolean;
  labels: boolean;
  labelCreate: boolean;
  labelEdit: boolean;
  labelDelete: boolean;
  move: boolean;
}

export function assertUnreachable(value: never): never {
  throw new Error(
    `Unreachable value reached: ${JSON.stringify(value, null, 2)}`
  );
}
