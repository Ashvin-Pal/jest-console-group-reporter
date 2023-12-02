import { INDENT } from "../constants";
import { styleMessageByType } from "@/style";
import type { LogEntry, ConsoleTypes } from "@/types";

export const formatDetailedMessage = ({
  type,
  message,
  stackTrace,
}: {
  type: ConsoleTypes;
  message: string;
  stackTrace: LogEntry["stackTrace"];
}): string => {
  const indentedMessage = message
    .split(/\n/)
    .map((line) => `${INDENT.CONSOLE}${line}`)
    .join("\n");

  const styledMessage = styleMessageByType({ type, message: indentedMessage });
  const styledStackTrace = styleMessageByType({ type: "stackTrace", message: stackTrace });
  return `\n${styledMessage.trimEnd()}\n${styledStackTrace.trimEnd()}\n`;
};
