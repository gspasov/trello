import type { Card } from "./models/card";
import type { List } from "./models/list";

export type DefaultMouseEvent = MouseEvent & {
  currentTarget: EventTarget & HTMLElement;
};

export interface DispatchDueDatePosition {
  openDueDate: Coordinates;
}

export interface DispatchOpenNewBoardMenu {
  openNewBoardMenu: Coordinates;
}

export interface DispatchCompleted {
  toggleCompleted: DispatchCompletedPayload;
}

export interface DispatchCompletedPayload {
  completed: boolean;
}

export interface DispatchSelectDueDate {
  select: Date;
}

export interface DispatchCardOpen {
  cardOpened: DispatchCardOpenPayload;
}

export interface DispatchCardOpenPayload {
  list: List;
  card: Card;
}

export interface Coordinates {
  x: number;
  y: number;
}

export enum AppMenus {
  NEW_BOARD = "newBoard",
}

export interface AppMenusVisibility {
  newBoard: boolean;
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
