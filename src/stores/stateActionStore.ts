import { Either, Right, sequenceEither } from "@quanterall/lich";
import { writable } from "svelte/store";
import { StateAction, StateActionType } from "../actions";
import {
  processAddBoardToFavorites,
  processChangeSelectedBoardAction,
  processCreateBoard,
  processRemoveBoardFromFavorites,
} from "../models/board";
import {
  processAttachLabelToCard,
  processCreateCard,
  processDeleteCard,
  processEditCardDescription,
  processMarkCardAsDone,
  processMarkCardAsUndone,
  processRemoveCardDueDate,
  processDetachLabelFromCard,
  processRenameCard,
  processSetCardDueDate,
} from "../models/card";
import { processCreateLabel, processUpdateLabel } from "../models/label";
import {
  processCloseListMenu,
  processCreateList,
  processDeleteAllCardsFromList,
  processDeleteList,
  processMoveCard,
  processMoveList,
  processOpenListMenu,
  processRenameList,
} from "../models/list";
import { assertUnreachable } from "../utilities";
import { WorkspaceStore } from "./workspaceStore";

const stateActions: StateAction[] = [];
export const StateActionsStore = writable(stateActions);

export function addStateAction(action: StateAction): void {
  StateActionsStore.update((stateActions) => [...stateActions, action]);
  // NOTE: Not sure if this is the most fitting way to clear the store
  // Possibly a better way to do this would be the action itself to remove the action from the store
  // but this introduces endless loop
  StateActionsStore.set([]);
}

StateActionsStore.subscribe((actions) => {
  sequenceEither(actions.map(executeAction)).onLeft((error) => {
    console.error("Error while executing action: ", error);
  });
});

function executeAction(action: StateAction): Either<null, string> {
  switch (action.type) {
    case StateActionType.CreateBoard: {
      console.log("CreateBoard", action.payload);
      WorkspaceStore.update(processCreateBoard(action.payload));
      return Right(null);
    }
    case StateActionType.RenameBoard: {
      console.log("RenameBoard", action.payload);
      return Right(null);
    }
    case StateActionType.DeleteBoard: {
      console.log("DeleteBoard", action.payload);
      return Right(null);
    }
    case StateActionType.CreateList: {
      console.log("CreateList", action.payload);
      WorkspaceStore.update(processCreateList(action.payload));
      return Right(null);
    }
    case StateActionType.CreateCard: {
      console.log("CreateCard", action.payload);
      WorkspaceStore.update(processCreateCard(action.payload));
      return Right(null);
    }
    case StateActionType.CreateLabel: {
      console.log("CreateLabel", action.payload);
      WorkspaceStore.update(processCreateLabel(action.payload));
      return Right(null);
    }
    case StateActionType.AddBoardToFavorites: {
      console.log("AddBoardToFavorites", action.payload);
      WorkspaceStore.update(processAddBoardToFavorites(action.payload));
      return Right(null);
    }
    case StateActionType.RemoveBoardFromFavorites: {
      console.log("RemoveBoardFromFavorites", action.payload);
      WorkspaceStore.update(processRemoveBoardFromFavorites(action.payload));
      return Right(null);
    }
    case StateActionType.ChangeSelectedBoard: {
      console.log("ChangeSelectedBoard", action.payload);
      WorkspaceStore.update(processChangeSelectedBoardAction(action.payload));
      return Right(null);
    }
    case StateActionType.DeleteLabel: {
      console.log("DeleteLabel", action.payload);
      return Right(null);
    }
    case StateActionType.UpdateLabel: {
      console.log("UpdateLabel", action.payload);
      WorkspaceStore.update(processUpdateLabel(action.payload));
      return Right(null);
    }
    case StateActionType.RenameList: {
      console.log("RenameList", action.payload);
      WorkspaceStore.update(processRenameList(action.payload));
      return Right(null);
    }
    case StateActionType.RenameCard: {
      console.log("RenameCard", action.payload);
      WorkspaceStore.update(processRenameCard(action.payload));
      return Right(null);
    }
    case StateActionType.EditCardDescription: {
      console.log("EditCardDescription", action.payload);
      WorkspaceStore.update(processEditCardDescription(action.payload));
      return Right(null);
    }
    case StateActionType.AttachLabelToCard: {
      console.log("AddLabelToCard", action.payload);
      WorkspaceStore.update(processAttachLabelToCard(action.payload));
      return Right(null);
    }
    case StateActionType.DetachLabelFromCard: {
      console.log("RemoveLabelFromCard", action.payload);
      WorkspaceStore.update(processDetachLabelFromCard(action.payload));
      return Right(null);
    }
    case StateActionType.MoveCard: {
      console.log("MoveCard", action.payload);
      WorkspaceStore.update(processMoveCard(action.payload));
      return Right(null);
    }
    case StateActionType.MoveList: {
      console.log("MoveCard", action.payload);
      WorkspaceStore.update(processMoveList(action.payload));
      return Right(null);
    }
    case StateActionType.SetCardDueDate: {
      console.log("AddDueDateToCard", action.payload);
      WorkspaceStore.update(processSetCardDueDate(action.payload));
      return Right(null);
    }
    case StateActionType.RemoveCardDueDate: {
      console.log("RemoveDueDateFromCard", action.payload);
      WorkspaceStore.update(processRemoveCardDueDate(action.payload));
      return Right(null);
    }
    case StateActionType.DeleteCard: {
      console.log("DeleteCard", action.payload);
      WorkspaceStore.update(processDeleteCard(action.payload));
      return Right(null);
    }
    case StateActionType.DeleteList: {
      console.log("DeleteList", action.payload);
      WorkspaceStore.update(processDeleteList(action.payload));
      return Right(null);
    }
    case StateActionType.MarkCardAsDone: {
      console.log("MarkCardAsDone", action.payload);
      WorkspaceStore.update(processMarkCardAsDone(action.payload));
      return Right(null);
    }
    case StateActionType.MarkCardAsUndone: {
      console.log("MarkCardAsUndone", action.payload);
      WorkspaceStore.update(processMarkCardAsUndone(action.payload));
      return Right(null);
    }
    case StateActionType.DeleteAllCardsFromList: {
      console.log("DeleteAllCardsFromList", action.payload);
      WorkspaceStore.update(processDeleteAllCardsFromList(action.payload));
      return Right(null);
    }
    case StateActionType.OpenListMenu: {
      console.log("OpenListMenu", action.payload);
      WorkspaceStore.update(processOpenListMenu(action.payload));
      return Right(null);
    }
    case StateActionType.CloseListMenu: {
      console.log("CloseListMenu", action.payload);
      WorkspaceStore.update(processCloseListMenu(action.payload));
      return Right(null);
    }
    default:
      assertUnreachable(action);
  }
}
