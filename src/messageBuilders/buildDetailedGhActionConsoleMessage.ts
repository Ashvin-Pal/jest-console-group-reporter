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

export const buildDetailedGhActionConsoleMessage = (props: BuildConsoleMessage): string => {
  const { displayOptions } = props;
  const { filePaths } = displayOptions;
  const formattedHeader = formatHeader(props);
  const formattedSummaryMessage = formatSummaryMessage(props);
  const formattedDetailedMessage = formatDetailedMessage(props);
  const formattedTestFilePaths = filePaths ? formatTestFilePaths(props) : "";
  return `::group::${formattedHeader}${formattedSummaryMessage}\n${formattedDetailedMessage}${formattedTestFilePaths}\n::endgroup::`;
};
