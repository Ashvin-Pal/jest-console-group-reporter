import { buildConsoleMessage } from "./buildConsoleMessage";
import type { ConsoleMessagesMap, DisplayOptions, LogEntry, Options } from "@/types";

const orderByCount = (
  [, { count: aCount }]: [string, LogEntry],
  [, { count: bCount }]: [string, LogEntry]
): number => {
  if (aCount > bCount) return -1;
  if (bCount > aCount) return 1;

  return 0;
};

export const buildConsoleMessages = ({
  consoleLevels,
  consoleMap,
  displayOptions,
  useGitHubActions,
}: {
  consoleMap: ConsoleMessagesMap;
  consoleLevels: Options["consoleLevels"];
  useGitHubActions: Options["useGitHubActions"];
  displayOptions: DisplayOptions;
}): string[] => {
  if (consoleMap.size === 0) {
    return [];
  }

  return consoleLevels.reduce((acc: string[], type) => {
    const consoleType = consoleMap.get(type);
    if (consoleType) {
      const consoleTypeEntries = Array.from(consoleType.entries()).sort(orderByCount);
      const consoleMessage = consoleTypeEntries.map(([message, logEntry]) =>
        buildConsoleMessage({ message, type, ...logEntry, displayOptions, useGitHubActions })
      );
      acc.push(...consoleMessage);
    }
    return acc;
  }, []);
};
