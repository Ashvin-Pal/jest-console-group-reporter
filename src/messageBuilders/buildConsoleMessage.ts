import type { ConsoleTypes, DisplayOptions, LogEntry } from "@/types";
import {
  formatTestFilePaths,
  formatSummaryMessage,
  formatDetailedMessage,
  formatHeader,
} from "@/formatters";

interface BuildConsoleMessage extends LogEntry {
  type: ConsoleTypes;
  message: string;
  displayOptions: DisplayOptions;
}

export const buildConsoleMessage = (props: BuildConsoleMessage): string => {
  const { displayOptions } = props;
  const { filePaths, reportType } = displayOptions;
  const formattedHeader = formatHeader(props);
  const isSummaryReporter = reportType === "summary";
  const formattedTestFilePaths = filePaths ? formatTestFilePaths(props) : "";
  const formattedMessage = isSummaryReporter
    ? formatSummaryMessage(props)
    : formatDetailedMessage(props);
  return `${formattedHeader}${formattedMessage}${formattedTestFilePaths}`;
};
