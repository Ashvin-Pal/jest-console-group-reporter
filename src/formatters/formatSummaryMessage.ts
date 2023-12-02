import { styleMessageByType } from "@/style";
import type { ConsoleTypes } from "@/types";

const truncateMessage = (message: string): string => {
  const truncated = message.length > 150 ? `${message.substring(0, 150)}...` : message;
  return truncated.replace(/\n/g, " ");
};

export const formatSummaryMessage = ({
  type,
  message,
}: {
  type: ConsoleTypes;
  message: string;
}): string => {
  return `${styleMessageByType({ type, message: truncateMessage(message) })}`;
};
