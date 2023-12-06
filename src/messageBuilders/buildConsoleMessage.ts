import type { ConsoleTypes, DisplayOptions, LogEntry, Options } from "@/types";
import { buildDetailedGhActionConsoleMessage } from "./buildDetailedGhActionConsoleMessage";
import { buildSummaryConsoleMessage } from "./buildSummaryConsoleMessage";
import { buildDetailedConsoleMessage } from "./buildDetailedConsoleMessage";

interface BuildConsoleMessage extends LogEntry {
  type: ConsoleTypes;
  message: string;
  displayOptions: DisplayOptions;
  useGitHubActions: Options["useGitHubActions"];
}

export const buildConsoleMessage = (props: BuildConsoleMessage): string => {
  const { displayOptions, useGitHubActions } = props;
  const { reportType } = displayOptions;

  if (reportType === "summary") {
    return buildSummaryConsoleMessage(props);
  }

  if (reportType === "detailed" && useGitHubActions) {
    return buildDetailedGhActionConsoleMessage(props);
  }

  return buildDetailedConsoleMessage(props);
};
