import { v4 as uuidv4 } from "uuid";
import { LabelStore } from "../stores";
import { assertUnreachable } from "../supportTypes";

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
  color: string;
  name?: string;
};

export function Label(id: string, type: LabelColorType, name?: string): Label {
  return {
    type,
    id,
    color: labelColorTypeMapping(type),
    name,
  };
}

export function createLabel(type: LabelColorType, name?: string): void {
  LabelStore.update((labels) => {
    return orderLabelsByColor([
      ...labels,
      {
        id: uuidv4(),
        type: type,
        color: labelColorTypeMapping(type),
        name,
      },
    ]);
  });
}

export function updateLabel(id: string, newLabel: Label): void {
  LabelStore.update((labels) => {
    return orderLabelsByColor(
      labels.map((label) => {
        if (id !== label.id) return label;

        return newLabel;
      })
    );
  });
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
