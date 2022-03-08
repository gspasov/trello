import { Just, Maybe, Nothing } from "@quanterall/lich";

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
