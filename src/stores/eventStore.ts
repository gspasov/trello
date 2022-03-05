import { Either, Right } from "@quanterall/lich";
import { writable } from "svelte/store";
import {
  EventType,
  HistoryEvent,
  ServerEvent,
  UpdateHistoryEvent,
  WorkspaceEvent,
} from "../events";
import {
  Board,
  processAddBoardToFavorites,
  processChangeSelectedBoard,
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
import {
  processCreateLabel,
  processDeleteLabel,
  processUpdateLabel,
} from "../models/label";
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
import { HistoryStore } from "./historyStore";
import { WorkspaceStore } from "./workspaceStore";
import {
  processRedo,
  processUndo,
  History,
  processUpdateHistory,
} from "../models/history";

const workspaceEvents: WorkspaceEvent[] = [];
export const WorkspaceEventStore = writable(workspaceEvents);

const historyEvents: HistoryEvent[] = [];
export const HistoryEventStore = writable(historyEvents);

const serverEvents: ServerEvent[] = [];
export const ServerEventStore = writable(serverEvents);

export function addWorkspaceEvent(event: WorkspaceEvent): void {
  WorkspaceEventStore.update((events) => [...events, event]);
  WorkspaceEventStore.set([]);
}

export function addHistoryEvent(event: HistoryEvent): void {
  HistoryEventStore.update((events) => [...events, event]);
  HistoryEventStore.set([]);
}

export function addServerEvent(event: ServerEvent): void {
  ServerEventStore.update((events) => [...events, event]);
  ServerEventStore.set([]);
}

WorkspaceEventStore.subscribe((events) => {
  for (const event of events) {
    WorkspaceStore.update((boards) =>
      executeWorkspaceEvent(event, boards)
        .onRight((newBoards) => {
          if (
            event.type !== EventType.ConsiderMoveCard &&
            event.type !== EventType.ConsiderMoveList
          ) {
            addHistoryEvent(
              UpdateHistoryEvent({ boards: newBoards, eventType: event.type })
            );
          }
        })
        .onLeft(console.error)
        .otherwise(boards)
    );
  }
});

HistoryEventStore.subscribe((events) => {
  for (const event of events) {
    HistoryStore.update((history) =>
      executeHistoryEvent(event, history)
        .onLeft(console.error)
        .otherwise(history)
    );
  }
});

ServerEventStore.subscribe(async (events) => {
  for (const event of events) {
    const eventResult = await executeServerEvent(event);

    eventResult
      .onRight((events) => events.map(addWorkspaceEvent))
      .onLeft(console.error);
  }
});

function executeWorkspaceEvent(
  event: WorkspaceEvent,
  boards: Board[]
): Either<string, Board[]> {
  switch (event.type) {
    case EventType.CreateBoard: {
      console.info("CreateBoard", event.payload);
      return Right(processCreateBoard(boards, event.payload));
    }
    case EventType.RenameBoard: {
      console.info("RenameBoard", event.payload);
      return Right(boards);
    }
    case EventType.DeleteBoard: {
      console.info("DeleteBoard", event.payload);
      return Right(boards);
    }
    case EventType.CreateList: {
      console.info("CreateList", event.payload);
      return Right(processCreateList(boards, event.payload));
    }
    case EventType.CreateCard: {
      console.info("CreateCard", event.payload);
      return Right(processCreateCard(boards, event.payload));
    }
    case EventType.CreateLabel: {
      console.info("CreateLabel", event.payload);
      return Right(processCreateLabel(boards, event.payload));
    }
    case EventType.AddBoardToFavorites: {
      console.info("AddBoardToFavorites", event.payload);
      return Right(processAddBoardToFavorites(boards, event.payload));
    }
    case EventType.RemoveBoardFromFavorites: {
      console.info("RemoveBoardFromFavorites", event.payload);
      return Right(processRemoveBoardFromFavorites(boards, event.payload));
    }
    case EventType.ChangeSelectedBoard: {
      console.info("ChangeSelectedBoard", event.payload);
      return Right(processChangeSelectedBoard(boards, event.payload));
    }
    case EventType.DeleteLabel: {
      console.info("DeleteLabel", event.payload);
      return Right(processDeleteLabel(boards, event.payload));
    }
    case EventType.UpdateLabel: {
      console.info("UpdateLabel", event.payload);
      return Right(processUpdateLabel(boards, event.payload));
    }
    case EventType.RenameList: {
      console.info("RenameList", event.payload);
      return Right(processRenameList(boards, event.payload));
    }
    case EventType.RenameCard: {
      console.info("RenameCard", event.payload);
      return Right(processRenameCard(boards, event.payload));
    }
    case EventType.EditCardDescription: {
      console.info("EditCardDescription", event.payload);
      return Right(processEditCardDescription(boards, event.payload));
    }
    case EventType.AttachLabelToCard: {
      console.info("AttachLabelToCard", event.payload);
      return Right(processAttachLabelToCard(boards, event.payload));
    }
    case EventType.DetachLabelFromCard: {
      console.info("DetachLabelFromCard", event.payload);
      return Right(processDetachLabelFromCard(boards, event.payload));
    }
    case EventType.ConsiderMoveCard: {
      console.info("ConsiderMoveCard", event.payload);
      return Right(processMoveCard(boards, event.payload));
    }
    case EventType.MoveCard: {
      console.info("MoveCard", event.payload);
      return Right(processMoveCard(boards, event.payload));
    }
    case EventType.ConsiderMoveList: {
      console.info("ConsiderMoveList", event.payload);
      return Right(processMoveList(boards, event.payload));
    }
    case EventType.MoveList: {
      console.info("MoveList", event.payload);
      return Right(processMoveList(boards, event.payload));
    }
    case EventType.SetCardDueDate: {
      console.info("SetCardDueDate", event.payload);
      return Right(processSetCardDueDate(boards, event.payload));
    }
    case EventType.RemoveCardDueDate: {
      console.info("RemoveCardDueDate", event.payload);
      return Right(processRemoveCardDueDate(boards, event.payload));
    }
    case EventType.DeleteCard: {
      console.info("DeleteCard", event.payload);
      return Right(processDeleteCard(boards, event.payload));
    }
    case EventType.DeleteList: {
      console.info("DeleteList", event.payload);
      return Right(processDeleteList(boards, event.payload));
    }
    case EventType.MarkCardAsDone: {
      console.info("MarkCardAsDone", event.payload);
      return Right(processMarkCardAsDone(boards, event.payload));
    }
    case EventType.MarkCardAsUndone: {
      console.info("MarkCardAsUndone", event.payload);
      return Right(processMarkCardAsUndone(boards, event.payload));
    }
    case EventType.DeleteAllCardsFromList: {
      console.info("DeleteAllCardsFromList", event.payload);
      return Right(processDeleteAllCardsFromList(boards, event.payload));
    }
    case EventType.OpenListMenu: {
      console.info("OpenListMenu", event.payload);
      return Right(processOpenListMenu(boards, event.payload));
    }
    case EventType.CloseListMenu: {
      console.info("CloseListMenu", event.payload);
      return Right(processCloseListMenu(boards, event.payload));
    }
    default:
      assertUnreachable(event);
  }
}

function executeHistoryEvent(
  event: HistoryEvent,
  history: History
): Either<string, History> {
  switch (event.type) {
    case EventType.Redo: {
      console.info("Redo");
      return Right(processRedo(history));
    }
    case EventType.Undo: {
      console.info("Undo");
      return Right(processUndo(history));
    }
    case EventType.UpdateHistory: {
      console.info("UpdateHistory", event.payload);
      return Right(processUpdateHistory(history, event.payload));
    }
    default:
      assertUnreachable(event);
  }
}

async function executeServerEvent(
  event: ServerEvent
): Promise<Either<string, WorkspaceEvent[]>> {
  switch (event.type) {
    case EventType.GetBoards: {
      console.info("GetBoards");
      // Some api calls here...
      return Right([]);
    }
    case EventType.CreateBoard: {
      console.info("CreateBoard");
      // Some api calls here...
      return Right([]);
    }

    default:
      assertUnreachable(event);
  }
}
