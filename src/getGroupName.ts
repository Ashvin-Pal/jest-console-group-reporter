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
    if (isMatch(consoleMessage, match)) {
      const groupName = typeof name === "function" ? name(consoleMessage) : name;
      return { groupName, isCustomGroup: true };
    }
  }

  console.warn("A serious error");

  return { groupName: consoleMessage.message, isCustomGroup: false };
}
