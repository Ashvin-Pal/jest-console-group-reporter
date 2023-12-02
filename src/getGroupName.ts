import type { ConsoleMessage, Options } from "./types";

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

export function getGroupName(
  { message, type, origin }: ConsoleMessage,
  groups: Options["groups"]
): GroupName {
  for (const { match, name } of groups) {
    if (typeof match === "string" && message === match) {
      return { groupName: name, isCustomGroup: true };
    }

    if (match instanceof RegExp && match.test(message)) {
      return { groupName: name, isCustomGroup: true };
    }

    if (typeof match === "function" && match({ type, message, origin })) {
      return { groupName: name, isCustomGroup: true };
    }
  }
  return { groupName: message, isCustomGroup: false };
}
