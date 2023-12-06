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

  for (const [consoleType, consoleTypeMap] of consoleMessagesMap.entries()) {
    let currentConsoleType = mergedMap.get(consoleType);

    // Initialize the map for this consoleType if it doesn't exist
    if (!currentConsoleType) {
      currentConsoleType = new Map();
      mergedMap.set(consoleType, currentConsoleType);
    }

    for (const [key, value] of consoleTypeMap.entries()) {
      const existingObject = currentConsoleType.get(key);
      currentConsoleType.set(key, existingObject ? mergeLogEntries(existingObject, value) : value);
    }
  }

  return mergedMap;
}
