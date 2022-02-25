import type { Maybe } from "@quanterall/lich";
import type { BoardColorType } from "./models/board";
import type { Card } from "./models/card";
import type { LabelColorType } from "./models/label";
import type { List } from "./models/list";

export enum UpdateBoardStoreErrorType {
  BadBoardIdError = "BadBoardIdError",
  BadListIdError = "BadListIdError",
  BadCardIdError = "BadCardIdError",
}

export enum StateActionType {
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
  MoveList = "MoveList",
  DeleteAllCardsFromList = "DeleteAllCardsFromList",
  DeleteList = "DeleteList",
  CreateCard = "CreateCard",
  RenameCard = "RenameCard",
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
}

export type StateAction =
  | CreateBoardAction
  | RenameBoardAction
  | AddBoardToFavoritesAction
  | RemoveBoardFromFavoritesAction
  | ChangeSelectedBoardAction
  | DeleteBoardAction
  | CreateListAction
  | RenameListAction
  | OpenListMenuAction
  | CloseListMenuAction
  | MoveListAction
  | DeleteAllCardsFromListAction
  | DeleteListAction
  | CreateCardAction
  | RenameCardAction
  | MoveCardAction
  | EditCardDescriptionAction
  | SetCardDueDateAction
  | RemoveCardDueDateAction
  | DeleteCardAction
  | MarkCardAsDoneAction
  | MarkCardAsUndoneAction
  | CreateLabelAction
  | UpdateLabelAction
  | AttachLabelToCardAction
  | DetachLabelFromCardAction
  | DeleteLabelAction;

export type CreateBoardAction = {
  type: StateActionType.CreateBoard;
  payload: CreateBoardActionPayload;
};

export type CreateBoardActionPayload = {
  title: string;
  color: BoardColorType;
};

export function CreateBoardAction(
  payload: CreateBoardActionPayload
): CreateBoardAction {
  return { type: StateActionType.CreateBoard, payload };
}

export type RenameBoardAction = {
  type: StateActionType.RenameBoard;
  payload: RenameBoardActionPayload;
};

export type RenameBoardActionPayload = {
  id: string;
  title: string;
};

export function RenameBoardAction(
  payload: RenameBoardActionPayload
): RenameBoardAction {
  return { type: StateActionType.RenameBoard, payload };
}

export type DeleteBoardAction = {
  type: StateActionType.DeleteBoard;
  payload: DeleteBoardActionPayload;
};

export type DeleteBoardActionPayload = {
  id: string;
};

export function DeleteBoardAction(
  payload: DeleteBoardActionPayload
): DeleteBoardAction {
  return { type: StateActionType.DeleteBoard, payload };
}

export type CreateListAction = {
  type: StateActionType.CreateList;
  payload: CreateListActionPayload;
};

export type CreateListActionPayload = {
  boardId: string;
  title: string;
};

export function CreateListAction(
  payload: CreateListActionPayload
): CreateListAction {
  return { type: StateActionType.CreateList, payload };
}

export type CreateCardAction = {
  type: StateActionType.CreateCard;
  payload: CreateCardActionPayload;
};

export type CreateCardActionPayload = {
  boardId: string;
  listId: string;
  title: string;
};

export function CreateCardAction(
  payload: CreateCardActionPayload
): CreateCardAction {
  return { type: StateActionType.CreateCard, payload };
}

export type CreateLabelAction = {
  type: StateActionType.CreateLabel;
  payload: CreateLabelActionPayload;
};

export type CreateLabelActionPayload = {
  boardId: string;
  color: LabelColorType;
  name: Maybe<string>;
};

export function CreateLabelAction(
  payload: CreateLabelActionPayload
): CreateLabelAction {
  return { type: StateActionType.CreateLabel, payload };
}

export type AddBoardToFavoritesAction = {
  type: StateActionType.AddBoardToFavorites;
  payload: AddBoardToFavoritesActionPayload;
};

export type AddBoardToFavoritesActionPayload = {
  boardId: string;
};

export function AddBoardToFavoritesAction(
  payload: AddBoardToFavoritesActionPayload
): AddBoardToFavoritesAction {
  return { type: StateActionType.AddBoardToFavorites, payload };
}

export type RemoveBoardFromFavoritesAction = {
  type: StateActionType.RemoveBoardFromFavorites;
  payload: RemoveBoardFromFavoritesActionPayload;
};

export type RemoveBoardFromFavoritesActionPayload = {
  boardId: string;
};

export function RemoveBoardFromFavoritesAction(
  payload: RemoveBoardFromFavoritesActionPayload
): RemoveBoardFromFavoritesAction {
  return { type: StateActionType.RemoveBoardFromFavorites, payload };
}

export type ChangeSelectedBoardAction = {
  type: StateActionType.ChangeSelectedBoard;
  payload: ChangeSelectedBoardActionPayload;
};

export type ChangeSelectedBoardActionPayload = {
  boardId: string;
};

export function ChangeSelectedBoardAction(
  payload: ChangeSelectedBoardActionPayload
): ChangeSelectedBoardAction {
  return { type: StateActionType.ChangeSelectedBoard, payload };
}

export type DeleteLabelAction = {
  type: StateActionType.DeleteLabel;
  payload: DeleteLabelActionPayload;
};

export type DeleteLabelActionPayload = {
  boardId: string;
  labelId: string;
};

export function DeleteLabelAction(
  payload: DeleteLabelActionPayload
): DeleteLabelAction {
  return { type: StateActionType.DeleteLabel, payload };
}

export type UpdateLabelAction = {
  type: StateActionType.UpdateLabel;
  payload: UpdateLabelActionPayload;
};

export type UpdateLabelActionPayload = {
  boardId: string;
  labelId: string;
  colorType: LabelColorType;
  name: Maybe<string>;
};

export function UpdateLabelAction(
  payload: UpdateLabelActionPayload
): UpdateLabelAction {
  return { type: StateActionType.UpdateLabel, payload };
}

export type RenameListAction = {
  type: StateActionType.RenameList;
  payload: RenameListActionPayload;
};

export type RenameListActionPayload = {
  boardId: string;
  listId: string;
  title: string;
};

export function RenameListAction(
  payload: RenameListActionPayload
): RenameListAction {
  return { type: StateActionType.RenameList, payload };
}

export type MoveListAction = {
  type: StateActionType.MoveList;
  payload: MoveListActionPayload;
};

export type MoveListActionPayload = {
  boardId: string;
  lists: List[];
};

export function MoveListAction(payload: MoveListActionPayload): MoveListAction {
  return { type: StateActionType.MoveList, payload };
}

export type RenameCardAction = {
  type: StateActionType.RenameCard;
  payload: RenameCardActionPayload;
};

export type RenameCardActionPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  title: string;
};

export function RenameCardAction(
  payload: RenameCardActionPayload
): RenameCardAction {
  return { type: StateActionType.RenameCard, payload };
}

export type EditCardDescriptionAction = {
  type: StateActionType.EditCardDescription;
  payload: EditCardDescriptionActionPayload;
};

export type EditCardDescriptionActionPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  description: Maybe<string>;
};

export function EditCardDescriptionAction(
  payload: EditCardDescriptionActionPayload
): EditCardDescriptionAction {
  return { type: StateActionType.EditCardDescription, payload };
}

export type AttachLabelToCardAction = {
  type: StateActionType.AttachLabelToCard;
  payload: AttachLabelToCardActionPayload;
};

export type AttachLabelToCardActionPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  labelId: string;
};

export function AttachLabelToCardAction(
  payload: AttachLabelToCardActionPayload
): AttachLabelToCardAction {
  return { type: StateActionType.AttachLabelToCard, payload };
}

export type DetachLabelFromCardAction = {
  type: StateActionType.DetachLabelFromCard;
  payload: DetachLabelFromCardActionPayload;
};

export type DetachLabelFromCardActionPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  labelId: string;
};

export function DetachLabelFromCardAction(
  payload: DetachLabelFromCardActionPayload
): DetachLabelFromCardAction {
  return { type: StateActionType.DetachLabelFromCard, payload };
}

export function RemoveLabelFromCardAction(
  payload: DetachLabelFromCardActionPayload
): DetachLabelFromCardAction {
  return { type: StateActionType.DetachLabelFromCard, payload };
}

export type DeleteListAction = {
  type: StateActionType.DeleteList;
  payload: DeleteListActionPayload;
};

export type DeleteListActionPayload = {
  boardId: string;
  listId: string;
};

export function DeleteListAction(
  payload: DeleteListActionPayload
): DeleteListAction {
  return { type: StateActionType.DeleteList, payload };
}

export type DeleteCardAction = {
  type: StateActionType.DeleteCard;
  payload: DeleteCardActionPayload;
};

export type DeleteCardActionPayload = {
  boardId: string;
  listId: string;
  cardId: string;
};

export function DeleteCardAction(
  payload: DeleteCardActionPayload
): DeleteCardAction {
  return { type: StateActionType.DeleteCard, payload };
}

export type MoveCardAction = {
  type: StateActionType.MoveCard;
  payload: MoveCardActionPayload;
};

export type MoveCardActionPayload = {
  boardId: string;
  listId: string;
  cards: Card[];
};

export function MoveCardAction(payload: MoveCardActionPayload): MoveCardAction {
  return { type: StateActionType.MoveCard, payload };
}

export type SetCardDueDateAction = {
  type: StateActionType.SetCardDueDate;
  payload: SetCardDueDateActionPayload;
};

export type SetCardDueDateActionPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  dueDate: Maybe<Date>;
};

export function SetCardDueDateAction(
  payload: SetCardDueDateActionPayload
): SetCardDueDateAction {
  return { type: StateActionType.SetCardDueDate, payload };
}

export type RemoveCardDueDateAction = {
  type: StateActionType.RemoveCardDueDate;
  payload: RemoveCardDueDateActionPayload;
};

export type RemoveCardDueDateActionPayload = {
  boardId: string;
  listId: string;
  cardId: string;
};

export function RemoveCardDueDateAction(
  payload: RemoveCardDueDateActionPayload
): RemoveCardDueDateAction {
  return { type: StateActionType.RemoveCardDueDate, payload };
}

export type MarkCardAsDoneAction = {
  type: StateActionType.MarkCardAsDone;
  payload: MarkCardAsDoneActionPayload;
};

export type MarkCardAsDoneActionPayload = {
  boardId: string;
  listId: string;
  cardId: string;
};

export function MarkCardAsDoneAction(
  payload: MarkCardAsDoneActionPayload
): MarkCardAsDoneAction {
  return { type: StateActionType.MarkCardAsDone, payload };
}

export type MarkCardAsUndoneAction = {
  type: StateActionType.MarkCardAsUndone;
  payload: MarkCardAsUndonePayload;
};

export type MarkCardAsUndonePayload = {
  boardId: string;
  listId: string;
  cardId: string;
};

export function MarkCardAsUndoneAction(
  payload: MarkCardAsUndonePayload
): MarkCardAsUndoneAction {
  return { type: StateActionType.MarkCardAsUndone, payload };
}

export type DeleteAllCardsFromListAction = {
  type: StateActionType.DeleteAllCardsFromList;
  payload: DeleteAllCardsFromListActionPayload;
};

export type DeleteAllCardsFromListActionPayload = {
  boardId: string;
  listId: string;
};

export function DeleteAllCardsFromListAction(
  payload: DeleteAllCardsFromListActionPayload
): DeleteAllCardsFromListAction {
  return { type: StateActionType.DeleteAllCardsFromList, payload };
}

export type OpenListMenuAction = {
  type: StateActionType.OpenListMenu;
  payload: OpenListMenuActionPayload;
};

export type OpenListMenuActionPayload = {
  boardId: string;
  listId: string;
};

export function OpenListMenuAction(
  payload: OpenListMenuActionPayload
): OpenListMenuAction {
  return { type: StateActionType.OpenListMenu, payload };
}

export type CloseListMenuAction = {
  type: StateActionType.CloseListMenu;
  payload: CloseListMenuActionPayload;
};

export type CloseListMenuActionPayload = {
  boardId: string;
  listId: string;
};

export function CloseListMenuAction(
  payload: CloseListMenuActionPayload
): CloseListMenuAction {
  return { type: StateActionType.CloseListMenu, payload };
}
