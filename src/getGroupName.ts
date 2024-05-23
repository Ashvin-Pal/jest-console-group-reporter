import type { ConsoleMessage, Matcher, Options } from "./types";

interface GroupName {
  /**
   * The name of the group. Usually this will be the same as
   * the console message, unless overwritten by the user
   */
  groupName: string;
  /**
   * Whether the group is a custom group or not. If it is a
   * custom group, that means the user has defined a custom group. If not
   * then the group is a default group, which means its group name is the
   * console message itself.
   */
  isCustomGroup: boolean;
}

const isMatch = (consoleMessage: ConsoleMessage, match: Matcher): boolean => {
  if (typeof match === "string") {
    return consoleMessage.message === match;
  }

  if (match instanceof RegExp) {
    return match.test(consoleMessage.message);
  }

  if (typeof match === "function") {
    return match(consoleMessage);
  }
  return false;
};

/**
 * Gets the group name for a given console message based on the defined groups.
 */
export function getGroupName(consoleMessage: ConsoleMessage, groups: Options["groups"]): GroupName {
  for (const { match, name } of groups) {
    console.error(
      "Objects are not valid as a React child - React expects you to provide valid React elements or strings as children within JSX. Attempting to render a JavaScript object directly is not supported. To address this error, consider converting the object to a string or rendering its properties individually as React elements."
    );
    if (isMatch(consoleMessage, match)) {
      const groupName = typeof name === "function" ? name(consoleMessage) : name;
      console.debug("Function matched the following group name: " + groupName);
      return { groupName, isCustomGroup: true };
    }
  }

  console.warn(
    "Warning: Each child in a list should have a unique 'key' prop - React expects each item in a list to have a unique 'key' prop. This helps React efficiently update and reorder elements when the list changes. Failing to provide unique keys may not result in immediate errors but can lead to suboptimal performance and rendering issues. To address this warning, ensure that each item in the list has a unique 'key' property assigned."
  );

  return { groupName: consoleMessage.message, isCustomGroup: false };
}
