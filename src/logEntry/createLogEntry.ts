import path from "path";
import { formatStackTrace } from "jest-message-util";
import type { Config } from "@jest/reporters";
import type { LogEntry } from "@/types";

interface CreateLogEntry {
  isCustomGroup: boolean;
  message: string;
  testFilePath: string;
  origin: string;
  config: Config.ProjectConfig;
}

const stackTraceOptions = {
  noStackTrace: false,
  noCodeFrame: false,
};

/**
 * Creates a log entry object.
 */
export function createLogEntry({
  isCustomGroup,
  message,
  testFilePath,
  origin,
  config,
}: CreateLogEntry): LogEntry {
  const stackTrace = formatStackTrace(origin, config, stackTraceOptions);
  const relativePath = path.relative(process.cwd(), testFilePath);

  return {
    count: 1,
    isCustomGroup,
    ...(isCustomGroup && {
      messages: new Set([message]),
    }),
    testFilePaths: new Set([relativePath]),
    stackTrace,
  };
}
