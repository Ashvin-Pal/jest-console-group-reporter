import type { Config } from "@jest/reporters";
import { processConsoleMessages } from "../processConsoleMessages";
import { consoleMessagesMock } from "../mocks";

const testFilePath = "test.js";
const config = { projectRoot: "./" } as unknown as Config.ProjectConfig;

describe("processConsoleMessages", () => {
  test("Should return console messages map with no custom groups or filters", () => {
    const result = processConsoleMessages({
      filters: [],
      groups: [],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    expect(result.filteredCount).toBe(0);
    expect(result.consoleMessagesMap).toMatchSnapshot();
  });

  test("Should filter all console messages", () => {
    const result = processConsoleMessages({
      filters: [(): boolean => true],
      groups: [],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    expect(result.consoleMessagesMap.size).toBe(0);
    expect(result.filteredCount).toBe(consoleMessagesMock.length);
  });

  test("Should group all console messages under one group name for each console type", () => {
    const groupName = "All";
    const result = processConsoleMessages({
      filters: [],
      groups: [
        {
          name: groupName,
          match: (): boolean => true,
        },
      ],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    expect(result.consoleMessagesMap.size).toBe(4);
    expect(result.filteredCount).toBe(0);

    const consoleMessagesEntries = result.consoleMessagesMap.entries();

    for (const [, logEntryMap] of consoleMessagesEntries) {
      expect(logEntryMap.size).toBe(1);
      const logEntry = logEntryMap.get(groupName);
      expect(logEntry).toBeDefined();
      expect(logEntry?.isCustomGroup).toBe(true);
      expect(logEntry?.testFilePaths).toStrictEqual(new Set(["test.js"]));
      expect(logEntry?.messages).toBeInstanceOf(Set);
      expect(logEntry?.stackTrace).toBeDefined();
      expect(logEntry?.count).toBeGreaterThan(0);
    }
  });

  test("Should filter and group messages correctly", () => {
    const result = processConsoleMessages({
      filters: [/^This is a sample log message/],
      groups: [
        {
          name: "Error group",
          match: ({ type }): boolean => type === "error",
        },
      ],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    const errorMap = result.consoleMessagesMap.get("error");
    const errorCustomLogEntryGroup = errorMap?.get("Error group");
    expect(errorMap?.size).toBe(1);
    expect(result.filteredCount).toBe(1);
    expect(errorCustomLogEntryGroup).toStrictEqual({
      count: 3,
      isCustomGroup: true,
      stackTrace: "Network Module",
      testFilePaths: new Set(["test.js"]),
      messages: new Set(["Network connection lost.", "There was an error processing the data."]),
    });
    expect(result.consoleMessagesMap.size).toBe(3);
    expect(result.consoleMessagesMap).toMatchSnapshot();
  });
});
