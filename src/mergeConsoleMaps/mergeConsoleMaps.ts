import type { ConsoleMessagesMap } from "@/types";
import { mergeLogEntries } from "@/logEntry";
import { cloneConsoleMessagesMap } from "./cloneConsoleMessagesMap";

/**
 * Merges two ConsoleMessagesMap together without mutating the original maps.
 */
export function mergeConsoleMaps(
  aggregatedConsoleMessages: ConsoleMessagesMap,
  consoleMessagesMap: ConsoleMessagesMap
): ConsoleMessagesMap {
  const mergedMap: ConsoleMessagesMap = cloneConsoleMessagesMap(aggregatedConsoleMessages);
  const currentConsoleMapKeys = consoleMessagesMap.keys();

  for (const consoleType of currentConsoleMapKeys) {
    if (!mergedMap.has(consoleType)) {
      mergedMap.set(consoleType, new Map());
    }
  }

  for (const [consoleType, consoleTypeMap] of consoleMessagesMap.entries()) {
    const currentConsoleType = mergedMap.get(consoleType);

    for (const [key, value] of consoleTypeMap.entries()) {
      const existingObject = currentConsoleType?.get(key);
      if (existingObject) {
        currentConsoleType?.set(key, mergeLogEntries(existingObject, value));
        continue;
      }
      currentConsoleType?.set(key, { ...value });
    }
  }

  return mergedMap;
}