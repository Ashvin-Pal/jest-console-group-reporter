import type { ConsoleMessagesMap } from "@/types";

/**
 * Since we are supporting nodejs 16 onwards, we do the cloning manually. Later on, this
 * funciton can be removed to use structuredClone.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
 */
export const cloneConsoleMessagesMap = (_map: ConsoleMessagesMap): ConsoleMessagesMap => {
  const clone: ConsoleMessagesMap = new Map();
  _map.forEach((value, key) => clone.set(key, new Map(value)));
  return clone;
};
