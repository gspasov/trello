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