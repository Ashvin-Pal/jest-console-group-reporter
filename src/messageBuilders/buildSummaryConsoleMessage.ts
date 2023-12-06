import type { ConsoleTypes, DisplayOptions, LogEntry } from "@/types";
import { formatTestFilePaths, formatHeader, formatSummaryMessage } from "@/formatters";

interface BuildConsoleMessage extends LogEntry {
  type: ConsoleTypes;
  message: string;
  displayOptions: DisplayOptions;
}

export const buildSummaryConsoleMessage = (props: BuildConsoleMessage): string => {
  const { displayOptions } = props;
  const { filePaths } = displayOptions;
  const formattedHeader = formatHeader(props);
  const formattedMessage = formatSummaryMessage(props);
  const formattedTestFilePaths = filePaths ? formatTestFilePaths(props) : "";
  return `${formattedHeader}${formattedMessage}${formattedTestFilePaths}`;
};
