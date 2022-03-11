import { Just, Maybe, Nothing } from "@quanterall/lich";
import type { Board } from "./models/board";

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
