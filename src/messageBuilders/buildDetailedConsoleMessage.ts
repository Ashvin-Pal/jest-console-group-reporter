import type { ConsoleTypes, DisplayOptions, LogEntry } from "@/types";
import { formatTestFilePaths, formatDetailedMessage, formatHeader } from "@/formatters";

interface BuildConsoleMessage extends LogEntry {
  type: ConsoleTypes;
  message: string;
  displayOptions: DisplayOptions;
}

export const buildDetailedConsoleMessage = (props: BuildConsoleMessage): string => {
  const { displayOptions } = props;
  const { filePaths } = displayOptions;
  const formattedHeader = formatHeader(props);
  const formattedMessage = formatDetailedMessage(props);
  const formattedTestFilePaths = filePaths ? formatTestFilePaths(props) : "";
  return `${formattedHeader}${formattedMessage}${formattedTestFilePaths}`;
};
