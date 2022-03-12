import { Just, Maybe, Nothing } from "@quanterall/lich";
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
    dueDate: validateMaybe(validateDate),
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

export function validateDate(value: unknown): svt.ValidationResult<Date> {
  const validationResult = svt.validateString(value);
  return validationResult.valid
    ? svt.Valid(new Date(validationResult.value))
    : svt.Invalid(validationResult.errors);
}

export function validateMaybe<T>(
  validator: svt.Validator<T>
): svt.Validator<Maybe<T>> {
  return function (value: unknown): svt.ValidationResult<Maybe<T>> {
    return svt.validateWithTypeTag<Maybe<T>>(
      value,
      {
        ["Nothing"]: validateNothing,
        ["Just"]: validateJust(validator),
      },
      "type"
    );
  };
}

export function validateNothing<T>(
  value: unknown
): svt.ValidationResult<Maybe<T>> {
  const validationResult = svt.validate<Nothing<T>>(value, { type: "Nothing" });
  return validationResult.valid
    ? svt.Valid(Nothing())
    : svt.Invalid(validationResult.errors);
}

export function validateJust<T>(
  validator: svt.Validator<T>
): svt.Validator<Maybe<T>> {
  return function (value: unknown): svt.ValidationResult<Maybe<T>> {
    const validationResult = svt.validate<Just<T>>(value, {
      type: "Just",
      value: validator,
    });
    return validationResult.valid
      ? svt.Valid(Just(validationResult.value.value))
      : svt.Invalid(validationResult.errors);
  };
}
