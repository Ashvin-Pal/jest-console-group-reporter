import type { TestResult, Config } from "@jest/reporters";
import type { ConsoleMessagesMap, Options } from "@/types";
import { getGroupName } from "./getGroupName";
import { shouldFilterMessage } from "./shouldFilterMessage";
import { mergeLogEntries, createLogEntry } from "@/logEntry";

interface ProcessConsoleMessagesOptions
  extends Pick<Options, "filters" | "groups">,
    Pick<TestResult, "testFilePath" | "console"> {
  config: Config.ProjectConfig;
}

export function processConsoleMessages({
  filters,
  groups,
  testFilePath,
  console: consoleMessages = [],
  config,
}: ProcessConsoleMessagesOptions): {
  consoleMessagesMap: ConsoleMessagesMap;
  filteredCount: number;
} {
  const consoleMessagesMap: ConsoleMessagesMap = new Map();
  let filteredCount = 0;

  for (const consoleMessage of consoleMessages) {
    if (shouldFilterMessage(filters, consoleMessage)) {
      filteredCount += 1;
      continue;
    }

    const { groupName, isCustomGroup } = getGroupName(consoleMessage, groups);

    let logEntryMap = consoleMessagesMap.get(consoleMessage.type);
    if (!logEntryMap) {
      logEntryMap = new Map();
      consoleMessagesMap.set(consoleMessage.type, logEntryMap);
    }

    const logEntry = createLogEntry({ isCustomGroup, testFilePath, ...consoleMessage, config });

    const existingEntry = logEntryMap.get(groupName);
    logEntryMap.set(groupName, existingEntry ? mergeLogEntries(existingEntry, logEntry) : logEntry);
  }

  return { consoleMessagesMap, filteredCount };
}
