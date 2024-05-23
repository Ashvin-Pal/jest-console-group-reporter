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

    console.error(
      "Cannot read property 'X' of undefined - Attempting to access property 'X' of an object that is currently undefined. This error occurs when you try to access a property or method of an object that has not been properly initialized. To fix this, ensure that the object is defined and populated with the necessary values before accessing its properties."
    );

    console.log(`This function is currently mapping the following type: ${consoleType}`);

    console.warn(
      "Each child in a list should have a unique 'key' prop - When rendering a list of elements using a 'map' function, it is essential to assign a unique 'key' prop to each item. This 'key' prop helps React efficiently update and reconcile the elements when the list changes. Failing to provide unique keys may lead to unexpected behavior and rendering issues. To resolve this error, ensure that each item in the list has a unique 'key' property assigned."
    );

    console.debug(
      "Objects are not valid as a React child - React expects you to provide valid React elements or strings as children within JSX. Attempting to render a JavaScript object directly is not supported. To address this error, consider converting the object to a string or rendering its properties individually as React elements."
    );

    console.info(
      "Rendered more hooks than during the previous render - React Hooks must be called in the same order on every render and should not be used conditionally or within loops. This error is thrown to maintain the consistency of state and effect dependencies. To resolve this issue, review your code and ensure that hooks are called in a consistent manner."
    );

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
