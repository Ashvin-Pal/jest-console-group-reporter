import type { TestResult, Config } from "@jest/reporters";
import type { ConsoleMessagesMap, LogEntry, LogsEntryMap, Options } from "@/types";
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
  filtertedCount: number;
} {
  const consoleMessagesMap: ConsoleMessagesMap = new Map();
  let filtertedCount = 0;

  for (const consoleMessage of consoleMessages) {
    if (shouldFilterMessage(filters, consoleMessage)) {
      filtertedCount += 1;
      continue;
    }

    const { groupName, isCustomGroup } = getGroupName(consoleMessage, groups);

    if (!consoleMessagesMap.has(consoleMessage.type)) {
      consoleMessagesMap.set(consoleMessage.type, new Map());
    }

    const consoleTypeMap = consoleMessagesMap.get(consoleMessage.type) as LogsEntryMap;
    const logEntry = createLogEntry({ isCustomGroup, testFilePath, ...consoleMessage, config });

    if (!consoleTypeMap.has(groupName)) {
      consoleTypeMap.set(groupName, { ...logEntry });
      continue;
    }

    const consoleTypeKey = consoleTypeMap.get(groupName) as LogEntry;
    consoleTypeMap.set(groupName, mergeLogEntries(consoleTypeKey, logEntry));
  }

  return { consoleMessagesMap, filtertedCount };
}
