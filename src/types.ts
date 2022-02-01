export type DefaultMouseEvent = MouseEvent & {
  currentTarget: EventTarget & HTMLElement;
};

export interface DispatchDueDatePosition {
  openDueDate: Coordinates;
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

export interface DispatchCompleted {
  toggleCompleted: DispatchCompletedPayload;
}

export interface DispatchCompletedPayload {
  completed: boolean;
}

export type List = {
  id: string;
  name: string;
  cards: Card[];
  isMenuOpened: boolean;
};

export function List(id: string, name: string, cards: Card[]): List {
  return {
    id,
    name,
    cards,
    isMenuOpened: false,
  };
}

export type Card = {
  id: string;
  title: string;
  labelIds: string[];
  completed: boolean;
  description?: string;
  assignedTo?: string;
  dueDate?: Date;
};

export function Card(
  id: string,
  title: string,
  description?: string,
  assignedTo?: string,
  dueDate?: Date
): Card {
  return {
    id,
    title,
    labelIds: [],
    completed: false,
    description,
    assignedTo,
    dueDate,
  };
}

export enum LabelColorType {
  Green = "green",
  Yellow = "yellow",
  Orange = "orange",
  Red = "red",
  Purple = "purple",
  Blue = "blue",
  LightBlue = "light-blue",
  Gray = "gray",
}

export function labelColorTypeMapping(labelColorType: LabelColorType): string {
  switch (labelColorType) {
    case LabelColorType.Green:
      return "#61bd4f";
    case LabelColorType.Yellow:
      return "#f2d600";
    case LabelColorType.Orange:
      return "#ff9f1a";
    case LabelColorType.Red:
      return "#eb5a46";
    case LabelColorType.Purple:
      return "#c377e0";
    case LabelColorType.Blue:
      return "#0079bf";
    case LabelColorType.LightBlue:
      return "#00c2e0";
    case LabelColorType.Gray:
      return "#b3bac5";
    default:
      return assertUnreachable(labelColorType);
  }
}

export type Label = {
  type: LabelColorType;
  id: string;
  name?: string;
  color: string;
};

export function GreenLabel(id: string, name?: string): Label {
  return {
    type: LabelColorType.Green,
    id,
    name,
    color: "#61bd4f",
  };
}

export function YellowLabel(id: string, name?: string): Label {
  return {
    type: LabelColorType.Yellow,
    id,
    name,
    color: "#f2d600",
  };
}

export function OrangeLabel(id: string, name?: string): Label {
  return {
    type: LabelColorType.Orange,
    id,
    name,
    color: "#ff9f1a",
  };
}

export function RedLabel(id: string, name?: string): Label {
  return {
    type: LabelColorType.Red,
    id,
    name,
    color: "#eb5a46",
  };
}

export function PurpleLabel(id: string, name?: string): Label {
  return {
    type: LabelColorType.Purple,
    id,
    name,
    color: "#c377e0",
  };
}

export function BlueLabel(id: string, name?: string): Label {
  return {
    type: LabelColorType.Blue,
    id,
    name,
    color: "#0079bf",
  };
}

export function LightBlueLabel(id: string, name?: string): Label {
  return {
    type: LabelColorType.LightBlue,
    id,
    name,
    color: "#00c2e0",
  };
}

export function GrayLabel(id: string, name?: string): Label {
  return {
    type: LabelColorType.Gray,
    id,
    name,
    color: "#b3bac5",
  };
}

export function orderLabelsByColor(labels: Label[]): Label[] {
  return labels.sort((a, b) => {
    switch (a.type) {
      case LabelColorType.Green: {
        switch (b.type) {
          case LabelColorType.Green:
            return 0;
          case LabelColorType.Yellow:
          case LabelColorType.Orange:
          case LabelColorType.Red:
          case LabelColorType.Purple:
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Yellow: {
        switch (b.type) {
          case LabelColorType.Green:
            return 1;
          case LabelColorType.Yellow:
            return 0;
          case LabelColorType.Orange:
          case LabelColorType.Red:
          case LabelColorType.Purple:
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Orange: {
        switch (b.type) {
          case LabelColorType.Green:
            return 1;
          case LabelColorType.Yellow:
            return 1;
          case LabelColorType.Orange:
            return 0;
          case LabelColorType.Red:
          case LabelColorType.Purple:
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Red: {
        switch (b.type) {
          case LabelColorType.Green:
            return 1;
          case LabelColorType.Yellow:
            return 1;
          case LabelColorType.Orange:
            return 1;
          case LabelColorType.Red:
            return 0;
          case LabelColorType.Purple:
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Purple: {
        switch (b.type) {
          case LabelColorType.Green:
            return 1;
          case LabelColorType.Yellow:
            return 1;
          case LabelColorType.Orange:
            return 1;
          case LabelColorType.Red:
            return 1;
          case LabelColorType.Purple:
            return 0;
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Blue: {
        switch (b.type) {
          case LabelColorType.Green:
            return 1;
          case LabelColorType.Yellow:
            return 1;
          case LabelColorType.Orange:
            return 1;
          case LabelColorType.Red:
            return 1;
          case LabelColorType.Purple:
            return 1;
          case LabelColorType.Blue:
            return 0;
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.LightBlue: {
        switch (b.type) {
          case LabelColorType.Green:
            return 1;
          case LabelColorType.Yellow:
            return 1;
          case LabelColorType.Orange:
            return 1;
          case LabelColorType.Red:
            return 1;
          case LabelColorType.Purple:
            return 1;
          case LabelColorType.Blue:
            return 1;
          case LabelColorType.LightBlue:
            return 0;
          case LabelColorType.Gray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Gray: {
        switch (b.type) {
          case LabelColorType.Green:
            return 1;
          case LabelColorType.Yellow:
            return 1;
          case LabelColorType.Orange:
            return 1;
          case LabelColorType.Red:
            return 1;
          case LabelColorType.Purple:
            return 1;
          case LabelColorType.Blue:
            return 1;
          case LabelColorType.LightBlue:
            return 1;
          case LabelColorType.Gray:
            return 0;
          default:
            return assertUnreachable(b.type);
        }
      }
      default:
        assertUnreachable(a.type);
    }
  });
}

export function assertUnreachable(value: never): never {
  throw new Error(
    `Unreachable value reached: ${JSON.stringify(value, null, 2)}`
  );
}
