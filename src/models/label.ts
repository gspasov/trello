import { Maybe, Nothing } from "@quanterall/lich";
import { v4 as uuidv4 } from "uuid";
import type {
  CreateLabelActionPayload,
  DeleteLabelActionPayload,
  UpdateLabelActionPayload,
} from "../actions";
import type { UpdateBoardStore } from "../stores/workspaceStore";
import { assertUnreachable } from "../utilities";

export enum LabelColorType {
  Green = "green",
  Yellow = "yellow",
  Orange = "orange",
  Red = "red",
  Purple = "purple",
  Blue = "blue",
  LightBlue = "light-blue",
  Gray = "gray",
  AddBtnGray = "add-btn-gray",
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
    case LabelColorType.AddBtnGray:
      return "#e5e5e5";
    default:
      return assertUnreachable(labelColorType);
  }
}

export type Label = {
  type: LabelColorType;
  id: string;
  color: string;
  name: Maybe<string>;
};

export function Label(
  id: string,
  type: LabelColorType,
  name: Maybe<string> = Nothing()
): Label {
  return {
    type,
    id,
    color: labelColorTypeMapping(type),
    name,
  };
}

export function processCreateLabel({
  boardId,
  color,
  name,
}: CreateLabelActionPayload): UpdateBoardStore {
  return (boards) => {
    return boards.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        labels: orderLabelsByColor([
          ...board.labels,
          Label(uuidv4(), color, name),
        ]),
      };
    });
  };
}

export function processUpdateLabel({
  boardId,
  labelId,
  colorType,
  name,
}: UpdateLabelActionPayload): UpdateBoardStore {
  return (boards) => {
    return boards.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        labels: orderLabelsByColor(
          board.labels.map((label) => {
            if (labelId !== label.id) return label;

            return Label(labelId, colorType, name);
          })
        ),
      };
    });
  };
}

export function processDeleteLabel({
  boardId,
  labelId,
}: DeleteLabelActionPayload): UpdateBoardStore {
  return (boards) => {
    return boards.map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        labels: orderLabelsByColor(
          board.labels.filter((label) => label.id !== labelId)
        ),
      };
    });
  };
}

export function defaultLabels(): Label[] {
  return [
    Label(uuidv4(), LabelColorType.Green),
    Label(uuidv4(), LabelColorType.Yellow),
    Label(uuidv4(), LabelColorType.Orange),
    Label(uuidv4(), LabelColorType.Red),
    Label(uuidv4(), LabelColorType.Purple),
    Label(uuidv4(), LabelColorType.Blue),
    Label(uuidv4(), LabelColorType.LightBlue),
    Label(uuidv4(), LabelColorType.Gray),
  ];
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
          case LabelColorType.AddBtnGray:
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
          case LabelColorType.AddBtnGray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Orange: {
        switch (b.type) {
          case LabelColorType.Green:
          case LabelColorType.Yellow:
            return 1;
          case LabelColorType.Orange:
            return 0;
          case LabelColorType.Red:
          case LabelColorType.Purple:
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
          case LabelColorType.AddBtnGray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Red: {
        switch (b.type) {
          case LabelColorType.Green:
          case LabelColorType.Yellow:
          case LabelColorType.Orange:
            return 1;
          case LabelColorType.Red:
            return 0;
          case LabelColorType.Purple:
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
          case LabelColorType.AddBtnGray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Purple: {
        switch (b.type) {
          case LabelColorType.Green:
          case LabelColorType.Yellow:
          case LabelColorType.Orange:
          case LabelColorType.Red:
            return 1;
          case LabelColorType.Purple:
            return 0;
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
          case LabelColorType.AddBtnGray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Blue: {
        switch (b.type) {
          case LabelColorType.Green:
          case LabelColorType.Yellow:
          case LabelColorType.Orange:
          case LabelColorType.Red:
          case LabelColorType.Purple:
            return 1;
          case LabelColorType.Blue:
            return 0;
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
          case LabelColorType.AddBtnGray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.LightBlue: {
        switch (b.type) {
          case LabelColorType.Green:
          case LabelColorType.Yellow:
          case LabelColorType.Orange:
          case LabelColorType.Red:
          case LabelColorType.Purple:
          case LabelColorType.Blue:
            return 1;
          case LabelColorType.LightBlue:
            return 0;
          case LabelColorType.Gray:
          case LabelColorType.AddBtnGray:
            return -1;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.Gray: {
        switch (b.type) {
          case LabelColorType.Green:
          case LabelColorType.Yellow:
          case LabelColorType.Orange:
          case LabelColorType.Red:
          case LabelColorType.Purple:
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
            return 1;
          case LabelColorType.AddBtnGray:
            return -1;
          case LabelColorType.Gray:
            return 0;
          default:
            return assertUnreachable(b.type);
        }
      }
      case LabelColorType.AddBtnGray: {
        switch (b.type) {
          case LabelColorType.Green:
          case LabelColorType.Yellow:
          case LabelColorType.Orange:
          case LabelColorType.Red:
          case LabelColorType.Purple:
          case LabelColorType.Blue:
          case LabelColorType.LightBlue:
          case LabelColorType.Gray:
            return 1;
          case LabelColorType.AddBtnGray:
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
