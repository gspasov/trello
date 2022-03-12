import { Either, Just, Left, Maybe, Nothing, Right } from "@quanterall/lich";
import type { Board } from "./models/board";
import type * as svt from "simple-validation-tools";

export function stringToMaybe(s: string): Maybe<string> {
  if (s === "") return Nothing();

  return Just(s);
}

export function assertUnreachable(value: never): never {
  throw new Error(
    `Unreachable value reached: ${JSON.stringify(value, null, 2)}`
  );
}

export function hasOwnProperty<T extends {}, U extends PropertyKey>(
  obj: T,
  prop: U
): obj is T & Record<U, unknown> {
  return obj.hasOwnProperty(prop);
}

export function getBodyStyle(
  board: Maybe<Board>,
  defaultBackgroundColor: string
): string {
  return `
    <style> 
      body {
        background-color: ${board
          .map((b) => b.color.color)
          .otherwise(defaultBackgroundColor)};
      } 
    </style>
  `;
}

export function validatorToEither<E, T>(
  validator: svt.Validator<T>,
  onInvalid: (validationEither: svt.Invalid<T>) => E
): (value: unknown) => Either<E, T> {
  return function applyValidatorToEither(value: unknown): Either<E, T> {
    const validationEither = validator(value);

    return validationEither.valid
      ? Right(validationEither.value)
      : Left(onInvalid(validationEither));
  };
}
