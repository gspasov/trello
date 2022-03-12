import type { Just, Maybe, Nothing } from "@quanterall/lich";
import * as svt from "simple-validation-tools";
import { Board, BoardColor, BoardColorType } from "./models/board";
import { Label, LabelColorType } from "./models/label";
import type { Card } from "./models/card";
import type { List } from "./models/list";

export function validateWorkspace(
  value: unknown
): svt.ValidationResult<Board[]> {
  return svt.validateArray((value) => validateBoard(value))(value);
}

export function validateBoard(value: unknown): svt.ValidationResult<Board> {
  return svt.validate(value, {
    id: svt.validateString,
    name: svt.validateString,
    lists: svt.validateArray(validateList),
    labels: svt.validateArray(validateLabel),
    color: validateBoardColor,
    selected: svt.validateBoolean,
    favorite: svt.validateBoolean,
  });
}

export function validateBoardColor(
  value: unknown
): svt.ValidationResult<BoardColor> {
  return svt.validate(value, {
    id: svt.validateString,
    type: validateBoardColorType,
    color: svt.validateString,
  });
}

export function validateBoardColorType(
  value: unknown
): svt.ValidationResult<BoardColorType> {
  return svt.validateOneOfLiterals(value, [
    BoardColorType.Blue,
    BoardColorType.Gray,
    BoardColorType.Green,
    BoardColorType.LightBlue,
    BoardColorType.LightGreen,
    BoardColorType.Orange,
    BoardColorType.Pink,
    BoardColorType.Purple,
    BoardColorType.Red,
  ]);
}

export function validateList(value: unknown): svt.ValidationResult<List> {
  return svt.validate(value, {
    id: svt.validateString,
    title: svt.validateString,
    cards: svt.validateArray(validateCard),
    isMenuOpened: svt.validateBoolean,
  });
}

export function validateCard(value: unknown): svt.ValidationResult<Card> {
  return svt.validate(value, {
    id: svt.validateString,
    title: svt.validateString,
    labelIds: svt.validateArray(svt.validateString),
    completed: svt.validateBoolean,
    description: validateMaybe(svt.validateString),
    assignedTo: validateMaybe(svt.validateString),
    dueDate: validateMaybe(svt.validateString),
  });
}

export function validateLabel(value: unknown): svt.ValidationResult<Label> {
  return svt.validate(value, {
    id: svt.validateString,
    name: validateMaybe(svt.validateString),
    color: svt.validateString,
    type: validateLabelColorType,
  });
}

export function validateLabelColorType(
  value: unknown
): svt.ValidationResult<LabelColorType> {
  return svt.validateOneOfLiterals(value, [
    LabelColorType.Yellow,
    LabelColorType.Blue,
    LabelColorType.Gray,
    LabelColorType.Green,
    LabelColorType.LightBlue,
    LabelColorType.Orange,
    LabelColorType.AddBtnGray,
    LabelColorType.Purple,
    LabelColorType.Red,
  ]);
}

export function validateMaybe<T>(
  validator: svt.Validator<T>
): svt.Validator<Maybe<T>> {
  return function (value: unknown): svt.ValidationResult<Maybe<T>> {
    return svt.validateOneOf<Maybe<T>>(value, [
      validateNothing,
      validateJust(validator),
    ]);
  };
}

export function validateNothing<T>(
  value: unknown
): svt.ValidationResult<Nothing<T>> {
  return svt.validate(value, { type: "Nothing" });
}

export function validateJust<T>(
  validator: svt.Validator<T>
): svt.Validator<Just<T>> {
  return function (value: unknown): svt.ValidationResult<Just<T>> {
    return svt.validate(value, { type: "Just", value: validator });
  };
}
