import { getGroupName } from "../getGroupName";
import type { ConsoleMessage, Options } from "@/types";

const errorConsoleMessage = { message: "error", type: "error", origin: "console" };
const warnConsoleMessage = { message: "warn", type: "warn", origin: "warn" };
const errorTypePredicateFn = ({ type }: ConsoleMessage): boolean => type === "error";
const messageTypePredicateFn = ({ message }: ConsoleMessage): boolean => /^error/.test(message);
const originTypePredicateFn = ({ origin }: ConsoleMessage): boolean => /^console/.test(origin);
const dynamicNameFunction = (msg: ConsoleMessage): string => `Dynamic - ${msg.type}`;

describe("getGroupName", () => {
  test.each`
    groups                                       | consoleMessage         | expectedOutput
    ${[{ name: "Error group", match: "error" }]} | ${errorConsoleMessage} | ${{ groupName: "Error group", isCustomGroup: true }}
    ${[{ name: "Warn group", match: "warn" }]}   | ${errorConsoleMessage} | ${{ groupName: "error", isCustomGroup: false }}
  `(
    "Groups messages correctly when using a string match",
    ({
      groups,
      consoleMessage,
      expectedOutput,
    }: {
      groups: Options["groups"];
      consoleMessage: ConsoleMessage;
      expectedOutput: ReturnType<typeof getGroupName>;
    }) => {
      const { groupName, isCustomGroup } = getGroupName(consoleMessage, groups);
      expect(groupName).toBe(expectedOutput.groupName);
      expect(isCustomGroup).toBe(expectedOutput.isCustomGroup);
    }
  );

  test.each`
    groups                                       | consoleMessage         | expectedOutput
    ${[{ name: "Error group", match: /error/ }]} | ${errorConsoleMessage} | ${{ groupName: "Error group", isCustomGroup: true }}
    ${[{ name: "Warn group", match: /warn/ }]}   | ${errorConsoleMessage} | ${{ groupName: "error", isCustomGroup: false }}
  `(
    "Groups messages correctly when using a regex expression match",
    ({
      groups,
      consoleMessage,
      expectedOutput,
    }: {
      groups: Options["groups"];
      consoleMessage: ConsoleMessage;
      expectedOutput: ReturnType<typeof getGroupName>;
    }) => {
      const { groupName, isCustomGroup } = getGroupName(consoleMessage, groups);
      expect(groupName).toBe(expectedOutput.groupName);
      expect(isCustomGroup).toBe(expectedOutput.isCustomGroup);
    }
  );

  test.each`
    groups                                                      | consoleMessage         | expectedOutput
    ${[{ name: "Error group", match: errorTypePredicateFn }]}   | ${errorConsoleMessage} | ${{ groupName: "Error group", isCustomGroup: true }}
    ${[{ name: "Error group", match: messageTypePredicateFn }]} | ${errorConsoleMessage} | ${{ groupName: "Error group", isCustomGroup: true }}
    ${[{ name: "Error group", match: originTypePredicateFn }]}  | ${errorConsoleMessage} | ${{ groupName: "Error group", isCustomGroup: true }}
    ${[{ name: "Error group", match: errorTypePredicateFn }]}   | ${warnConsoleMessage}  | ${{ groupName: "warn", isCustomGroup: false }}
    ${[{ name: "Error group", match: messageTypePredicateFn }]} | ${warnConsoleMessage}  | ${{ groupName: "warn", isCustomGroup: false }}
    ${[{ name: "Error group", match: originTypePredicateFn }]}  | ${warnConsoleMessage}  | ${{ groupName: "warn", isCustomGroup: false }}
  `(
    "Groups messages correctly when using a predicate function match",
    ({
      groups,
      consoleMessage,
      expectedOutput,
    }: {
      groups: Options["groups"];
      consoleMessage: ConsoleMessage;
      expectedOutput: ReturnType<typeof getGroupName>;
    }) => {
      const { groupName, isCustomGroup } = getGroupName(consoleMessage, groups);
      expect(groupName).toBe(expectedOutput.groupName);
      expect(isCustomGroup).toBe(expectedOutput.isCustomGroup);
    }
  );

  test.each`
    groups                                                          | consoleMessage         | expectedOutput
    ${[{ match: "error", name: dynamicNameFunction }]}              | ${errorConsoleMessage} | ${{ groupName: "Dynamic - error", isCustomGroup: true }}
    ${[{ match: /warn/, name: dynamicNameFunction }]}               | ${warnConsoleMessage}  | ${{ groupName: "Dynamic - warn", isCustomGroup: true }}
    ${[{ match: errorTypePredicateFn, name: dynamicNameFunction }]} | ${errorConsoleMessage} | ${{ groupName: "Dynamic - error", isCustomGroup: true }}
  `(
    "Groups messages correctly with dynamic naming",
    ({
      groups,
      consoleMessage,
      expectedOutput,
    }: {
      groups: Options["groups"];
      consoleMessage: ConsoleMessage;
      expectedOutput: ReturnType<typeof getGroupName>;
    }) => {
      const { groupName, isCustomGroup } = getGroupName(consoleMessage, groups);
      expect(groupName).toBe(expectedOutput.groupName);
      expect(isCustomGroup).toBe(expectedOutput.isCustomGroup);
    }
  );
});
