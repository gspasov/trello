import { v4 as uuidv4 } from "uuid";
import { assertUnreachable } from "../utilities";
import type { List } from "./list";
import { defaultLabels, Label } from "./label";
import type { UpdateBoardStore } from "../stores/workspaceStore";
import type {
  AddBoardToFavoritesActionPayload,
  ChangeSelectedBoardActionPayload,
  CreateBoardActionPayload,
  RemoveBoardFromFavoritesAction,
  RemoveBoardFromFavoritesActionPayload,
} from "../actions";

export type Board = {
  id: string;
  name: string;
  lists: List[];
  labels: Label[];
  color: BoardColor;
  selected: boolean;
  favorite: boolean;
};

export function Board(
  id: string,
  name: string,
  lists: List[],
  labels: Label[],
  color: BoardColor,
  selected: boolean = false,
  favorite: boolean = false
): Board {
  return {
    id,
    name,
    selected,
    favorite,
    color,
    labels,
    lists,
  };
}

export function processCreateBoard({
  title,
  color,
}: CreateBoardActionPayload): UpdateBoardStore {
  return (boards) => {
    const updatedBoards = [
      ...boards,
      Board(uuidv4(), title, [], defaultLabels(), BoardColor(uuidv4(), color)),
    ];

    return updatedBoards;
  };
}

export function processAddBoardToFavorites({
  boardId,
}: AddBoardToFavoritesActionPayload): UpdateBoardStore {
  return toggleBoardFavorite(boardId, true);
}

export function processRemoveBoardFromFavorites({
  boardId,
}: RemoveBoardFromFavoritesActionPayload): UpdateBoardStore {
  return toggleBoardFavorite(boardId, false);
}

export function processChangeSelectedBoardAction({
  boardId,
}: ChangeSelectedBoardActionPayload): UpdateBoardStore {
  return (boards) => {
    return boards.map((board) => ({
      ...board,
      selected: board.id === boardId,
    }));
  };
}

function toggleBoardFavorite(id: string, favorite: boolean): UpdateBoardStore {
  return (boards) => {
    return boards.map((board) => {
      if (board.id !== id) return board;

      return { ...board, favorite };
    });
  };
}

export type BoardColor = {
  id: string;
  type: BoardColorType;
  color: string;
};

export function BoardColor(id: string, type: BoardColorType): BoardColor {
  return {
    id,
    type,
    color: boardColorTypeMapping(type),
  };
}

export enum BoardColorType {
  Green = "green",
  LightGreen = "light-green",
  Orange = "orange",
  Red = "red",
  Purple = "purple",
  Pink = "pink",
  Blue = "blue",
  LightBlue = "light-blue",
  Gray = "gray",
}

export function boardColorTypeMapping(labelColorType: BoardColorType): string {
  switch (labelColorType) {
    case BoardColorType.Green:
      return "#519839";
    case BoardColorType.LightGreen:
      return "#4BBF6B";
    case BoardColorType.Orange:
      return "#D29034";
    case BoardColorType.Red:
      return "#B04639";
    case BoardColorType.Purple:
      return "#89609E";
    case BoardColorType.Pink:
      return "#CD5A91";
    case BoardColorType.Blue:
      return "#0079BF";
    case BoardColorType.LightBlue:
      return "#00AECC";
    case BoardColorType.Gray:
      return "#838C91";
    default:
      return assertUnreachable(labelColorType);
  }
}

export function boardColorTypeDarkMapping(
  labelColorType: BoardColorType
): string {
  switch (labelColorType) {
    case BoardColorType.Green:
      return "#417e2c";
    case BoardColorType.LightGreen:
      return "#3c9c56";
    case BoardColorType.Orange:
      return "#b07727";
    case BoardColorType.Red:
      return "#8c382e";
    case BoardColorType.Purple:
      return "#69497a";
    case BoardColorType.Pink:
      return "#9e4570";
    case BoardColorType.Blue:
      return "#005a8e";
    case BoardColorType.LightBlue:
      return "#00859c";
    case BoardColorType.Gray:
      return "#636a6e";
    default:
      return assertUnreachable(labelColorType);
  }
}
