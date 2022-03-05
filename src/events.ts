import type { Maybe } from "@quanterall/lich";
import type { Board, BoardColor, BoardColorType } from "./models/board";
import type { Card } from "./models/card";
import type { LabelColorType } from "./models/label";
import type { List } from "./models/list";

export enum EventType {
  CreateBoard = "CreateBoard",
  RenameBoard = "RenameBoard",
  AddBoardToFavorites = "AddBoardToFavorites",
  RemoveBoardFromFavorites = "RemoveBoardFromFavorites",
  ChangeSelectedBoard = "ChangeSelectedBoard",
  DeleteBoard = "DeleteBoard",
  CreateList = "CreateList",
  RenameList = "RenameList",
  OpenListMenu = "OpenListMenu",
  CloseListMenu = "CloseListMenu",
  ConsiderMoveList = "ConsiderMoveList",
  MoveList = "MoveList",
  DeleteAllCardsFromList = "DeleteAllCardsFromList",
  DeleteList = "DeleteList",
  CreateCard = "CreateCard",
  RenameCard = "RenameCard",
  ConsiderMoveCard = "ConsiderMoveCard",
  MoveCard = "MoveCard",
  EditCardDescription = "EditCardDescription",
  SetCardDueDate = "SetCardDueDate",
  RemoveCardDueDate = "RemoveCardDueDate",
  DeleteCard = "DeleteCard",
  MarkCardAsDone = "MarkCardAsDone",
  MarkCardAsUndone = "MarkCardAsUndone",
  CreateLabel = "CreateLabel",
  UpdateLabel = "UpdateLabel",
  AttachLabelToCard = "AttachLabelToCard",
  DetachLabelFromCard = "DetachLabelFromCard",
  DeleteLabel = "DeleteLabel",
  Undo = "Undo",
  Redo = "Redo",
  UpdateHistory = "UpdateHistory",
  GetBoards = "GetBoards",
}

export type WorkspaceEvent =
  | CreateBoardEvent
  | RenameBoardEvent
  | AddBoardToFavoritesEvent
  | RemoveBoardFromFavoritesEvent
  | ChangeSelectedBoardEvent
  | DeleteBoardEvent
  | CreateListEvent
  | RenameListEvent
  | OpenListMenuEvent
  | CloseListMenuEvent
  | ConsiderMoveListEvent
  | MoveListEvent
  | DeleteAllCardsFromListEvent
  | DeleteListEvent
  | CreateCardEvent
  | RenameCardEvent
  | ConsiderMoveCardEvent
  | MoveCardEvent
  | EditCardDescriptionEvent
  | SetCardDueDateEvent
  | RemoveCardDueDateEvent
  | DeleteCardEvent
  | MarkCardAsDoneEvent
  | MarkCardAsUndoneEvent
  | CreateLabelEvent
  | UpdateLabelEvent
  | AttachLabelToCardEvent
  | DetachLabelFromCardEvent
  | DeleteLabelEvent;

export type HistoryEvent = UndoEvent | RedoEvent | UpdateHistoryEvent;

export type ClientEvent = WorkspaceEvent | HistoryEvent;
export type ServerEvent = GetBoards | CreateBoard;
export type Event = ClientEvent | ServerEvent;

export type CreateBoardEvent = {
  type: EventType.CreateBoard;
  payload: CreateBoardEventPayload;
};

export type CreateBoardEventPayload = {
  title: string;
  color: BoardColorType;
};

export function CreateBoardEvent(
  payload: CreateBoardEventPayload
): CreateBoardEvent {
  return { type: EventType.CreateBoard, payload };
}

export type RenameBoardEvent = {
  type: EventType.RenameBoard;
  payload: RenameBoardEventPayload;
};

export type RenameBoardEventPayload = {
  id: string;
  title: string;
};

export function RenameBoardEvent(
  payload: RenameBoardEventPayload
): RenameBoardEvent {
  return { type: EventType.RenameBoard, payload };
}

export type DeleteBoardEvent = {
  type: EventType.DeleteBoard;
  payload: DeleteBoardEventPayload;
};

export type DeleteBoardEventPayload = {
  id: string;
};

export function DeleteBoardEvent(
  payload: DeleteBoardEventPayload
): DeleteBoardEvent {
  return { type: EventType.DeleteBoard, payload };
}

export type CreateListEvent = {
  type: EventType.CreateList;
  payload: CreateListEventPayload;
};

export type CreateListEventPayload = {
  boardId: string;
  title: string;
};

export function CreateListEvent(
  payload: CreateListEventPayload
): CreateListEvent {
  return { type: EventType.CreateList, payload };
}

export type CreateCardEvent = {
  type: EventType.CreateCard;
  payload: CreateCardEventPayload;
};

export type CreateCardEventPayload = {
  boardId: string;
  listId: string;
  title: string;
};

export function CreateCardEvent(
  payload: CreateCardEventPayload
): CreateCardEvent {
  return { type: EventType.CreateCard, payload };
}

export type CreateLabelEvent = {
  type: EventType.CreateLabel;
  payload: CreateLabelEventPayload;
};

export type CreateLabelEventPayload = {
  boardId: string;
  color: LabelColorType;
  name: Maybe<string>;
};

export function CreateLabelEvent(
  payload: CreateLabelEventPayload
): CreateLabelEvent {
  return { type: EventType.CreateLabel, payload };
}

export type AddBoardToFavoritesEvent = {
  type: EventType.AddBoardToFavorites;
  payload: AddBoardToFavoritesEventPayload;
};

export type AddBoardToFavoritesEventPayload = {
  boardId: string;
};

export function AddBoardToFavoritesEvent(
  payload: AddBoardToFavoritesEventPayload
): AddBoardToFavoritesEvent {
  return { type: EventType.AddBoardToFavorites, payload };
}

export type RemoveBoardFromFavoritesEvent = {
  type: EventType.RemoveBoardFromFavorites;
  payload: RemoveBoardFromFavoritesEventPayload;
};

export type RemoveBoardFromFavoritesEventPayload = {
  boardId: string;
};

export function RemoveBoardFromFavoritesEvent(
  payload: RemoveBoardFromFavoritesEventPayload
): RemoveBoardFromFavoritesEvent {
  return { type: EventType.RemoveBoardFromFavorites, payload };
}

export type ChangeSelectedBoardEvent = {
  type: EventType.ChangeSelectedBoard;
  payload: ChangeSelectedBoardEventPayload;
};

export type ChangeSelectedBoardEventPayload = {
  boardId: string;
};

export function ChangeSelectedBoardEvent(
  payload: ChangeSelectedBoardEventPayload
): ChangeSelectedBoardEvent {
  return { type: EventType.ChangeSelectedBoard, payload };
}

export type DeleteLabelEvent = {
  type: EventType.DeleteLabel;
  payload: DeleteLabelEventPayload;
};

export type DeleteLabelEventPayload = {
  boardId: string;
  labelId: string;
};

export function DeleteLabelEvent(
  payload: DeleteLabelEventPayload
): DeleteLabelEvent {
  return { type: EventType.DeleteLabel, payload };
}

export type UpdateLabelEvent = {
  type: EventType.UpdateLabel;
  payload: UpdateLabelEventPayload;
};

export type UpdateLabelEventPayload = {
  boardId: string;
  labelId: string;
  colorType: LabelColorType;
  name: Maybe<string>;
};

export function UpdateLabelEvent(
  payload: UpdateLabelEventPayload
): UpdateLabelEvent {
  return { type: EventType.UpdateLabel, payload };
}

export type RenameListEvent = {
  type: EventType.RenameList;
  payload: RenameListEventPayload;
};

export type RenameListEventPayload = {
  boardId: string;
  listId: string;
  title: string;
};

export function RenameListEvent(
  payload: RenameListEventPayload
): RenameListEvent {
  return { type: EventType.RenameList, payload };
}

export type MoveListEvent = {
  type: EventType.MoveList;
  payload: MoveListEventPayload;
};

export type MoveListEventPayload = {
  boardId: string;
  lists: List[];
};

export function MoveListEvent(payload: MoveListEventPayload): MoveListEvent {
  return { type: EventType.MoveList, payload };
}

export type RenameCardEvent = {
  type: EventType.RenameCard;
  payload: RenameCardEventPayload;
};

export type RenameCardEventPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  title: string;
};

export function RenameCardEvent(
  payload: RenameCardEventPayload
): RenameCardEvent {
  return { type: EventType.RenameCard, payload };
}

export type EditCardDescriptionEvent = {
  type: EventType.EditCardDescription;
  payload: EditCardDescriptionEventPayload;
};

export type EditCardDescriptionEventPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  description: Maybe<string>;
};

export function EditCardDescriptionEvent(
  payload: EditCardDescriptionEventPayload
): EditCardDescriptionEvent {
  return { type: EventType.EditCardDescription, payload };
}

export type AttachLabelToCardEvent = {
  type: EventType.AttachLabelToCard;
  payload: AttachLabelToCardEventPayload;
};

export type AttachLabelToCardEventPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  labelId: string;
};

export function AttachLabelToCardEvent(
  payload: AttachLabelToCardEventPayload
): AttachLabelToCardEvent {
  return { type: EventType.AttachLabelToCard, payload };
}

export type DetachLabelFromCardEvent = {
  type: EventType.DetachLabelFromCard;
  payload: DetachLabelFromCardEventPayload;
};

export type DetachLabelFromCardEventPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  labelId: string;
};

export function DetachLabelFromCardEvent(
  payload: DetachLabelFromCardEventPayload
): DetachLabelFromCardEvent {
  return { type: EventType.DetachLabelFromCard, payload };
}

export function RemoveLabelFromCardEvent(
  payload: DetachLabelFromCardEventPayload
): DetachLabelFromCardEvent {
  return { type: EventType.DetachLabelFromCard, payload };
}

export type DeleteListEvent = {
  type: EventType.DeleteList;
  payload: DeleteListEventPayload;
};

export type DeleteListEventPayload = {
  boardId: string;
  listId: string;
};

export function DeleteListEvent(
  payload: DeleteListEventPayload
): DeleteListEvent {
  return { type: EventType.DeleteList, payload };
}

export type DeleteCardEvent = {
  type: EventType.DeleteCard;
  payload: DeleteCardEventPayload;
};

export type DeleteCardEventPayload = {
  boardId: string;
  listId: string;
  cardId: string;
};

export function DeleteCardEvent(
  payload: DeleteCardEventPayload
): DeleteCardEvent {
  return { type: EventType.DeleteCard, payload };
}

export type MoveCardEvent = {
  type: EventType.MoveCard;
  payload: MoveCardEventPayload;
};

export type MoveCardEventPayload = {
  boardId: string;
  listId: string;
  cards: Card[];
};

export function MoveCardEvent(payload: MoveCardEventPayload): MoveCardEvent {
  return { type: EventType.MoveCard, payload };
}

export type SetCardDueDateEvent = {
  type: EventType.SetCardDueDate;
  payload: SetCardDueDateEventPayload;
};

export type SetCardDueDateEventPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  dueDate: Maybe<Date>;
};

export function SetCardDueDateEvent(
  payload: SetCardDueDateEventPayload
): SetCardDueDateEvent {
  return { type: EventType.SetCardDueDate, payload };
}

export type RemoveCardDueDateEvent = {
  type: EventType.RemoveCardDueDate;
  payload: RemoveCardDueDateEventPayload;
};

export type RemoveCardDueDateEventPayload = {
  boardId: string;
  listId: string;
  cardId: string;
};

export function RemoveCardDueDateEvent(
  payload: RemoveCardDueDateEventPayload
): RemoveCardDueDateEvent {
  return { type: EventType.RemoveCardDueDate, payload };
}

export type MarkCardAsDoneEvent = {
  type: EventType.MarkCardAsDone;
  payload: MarkCardAsDoneEventPayload;
};

export type MarkCardAsDoneEventPayload = {
  boardId: string;
  listId: string;
  cardId: string;
};

export function MarkCardAsDoneEvent(
  payload: MarkCardAsDoneEventPayload
): MarkCardAsDoneEvent {
  return { type: EventType.MarkCardAsDone, payload };
}

export type MarkCardAsUndoneEvent = {
  type: EventType.MarkCardAsUndone;
  payload: MarkCardAsUndonePayload;
};

export type MarkCardAsUndonePayload = {
  boardId: string;
  listId: string;
  cardId: string;
};

export function MarkCardAsUndoneEvent(
  payload: MarkCardAsUndonePayload
): MarkCardAsUndoneEvent {
  return { type: EventType.MarkCardAsUndone, payload };
}

export type DeleteAllCardsFromListEvent = {
  type: EventType.DeleteAllCardsFromList;
  payload: DeleteAllCardsFromListEventPayload;
};

export type DeleteAllCardsFromListEventPayload = {
  boardId: string;
  listId: string;
};

export function DeleteAllCardsFromListEvent(
  payload: DeleteAllCardsFromListEventPayload
): DeleteAllCardsFromListEvent {
  return { type: EventType.DeleteAllCardsFromList, payload };
}

export type OpenListMenuEvent = {
  type: EventType.OpenListMenu;
  payload: OpenListMenuEventPayload;
};

export type OpenListMenuEventPayload = {
  boardId: string;
  listId: string;
};

export function OpenListMenuEvent(
  payload: OpenListMenuEventPayload
): OpenListMenuEvent {
  return { type: EventType.OpenListMenu, payload };
}

export type CloseListMenuEvent = {
  type: EventType.CloseListMenu;
  payload: CloseListMenuEventPayload;
};

export type CloseListMenuEventPayload = {
  boardId: string;
  listId: string;
};

export function CloseListMenuEvent(
  payload: CloseListMenuEventPayload
): CloseListMenuEvent {
  return { type: EventType.CloseListMenu, payload };
}

export type UndoEvent = {
  type: EventType.Undo;
};

export function UndoEvent(): UndoEvent {
  return { type: EventType.Undo };
}

export type RedoEvent = {
  type: EventType.Redo;
};

export type RedoPayload = {
  empty: string;
};

export function RedoEvent(): RedoEvent {
  return { type: EventType.Redo };
}

export type UpdateHistoryEvent = {
  type: EventType.UpdateHistory;
  payload: UpdateHistoryEventPayload;
};

export type UpdateHistoryEventPayload = {
  boards: Board[];
  eventType: EventType;
};

export function UpdateHistoryEvent(
  payload: UpdateHistoryEventPayload
): UpdateHistoryEvent {
  return { type: EventType.UpdateHistory, payload };
}

export type ConsiderMoveListEvent = {
  type: EventType.ConsiderMoveList;
  payload: MoveListEventPayload;
};

export function ConsiderMoveListEvent(
  payload: MoveListEventPayload
): ConsiderMoveListEvent {
  return { type: EventType.ConsiderMoveList, payload };
}

export type ConsiderMoveCardEvent = {
  type: EventType.ConsiderMoveCard;
  payload: MoveCardEventPayload;
};

export function ConsiderMoveCardEvent(
  payload: MoveCardEventPayload
): ConsiderMoveCardEvent {
  return { type: EventType.ConsiderMoveCard, payload };
}

export type GetBoards = {
  type: EventType.GetBoards;
};

export function GetBoards(): GetBoards {
  return { type: EventType.GetBoards };
}

export type CreateBoard = {
  type: EventType.CreateBoard;
  payload: CreateBoardPayload;
};

export type CreateBoardPayload = {
  title: string;
  color: BoardColor;
};

export function CreateBoard(payload: CreateBoardPayload): CreateBoard {
  return { type: EventType.CreateBoard, payload };
}
