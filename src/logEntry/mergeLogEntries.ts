import type { LogEntry } from "@/types";

export function mergeLogEntries(logEntry1: LogEntry, logEntry2: LogEntry): LogEntry {
  const { isCustomGroup, stackTrace } = logEntry1;

  return {
    isCustomGroup,
    stackTrace,
    count: logEntry1.count + logEntry2.count,
    ...(isCustomGroup && {
      messages: new Set([...(logEntry1.messages || []), ...(logEntry2.messages || [])]),
    }),
    testFilePaths: new Set([...logEntry1.testFilePaths, ...logEntry2.testFilePaths]),
  };
}
