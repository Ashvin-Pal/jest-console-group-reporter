import type { DisplayOptions } from "@/types";

export const formatMessage = (
  message: string,
  reportType: DisplayOptions["reportType"]
): string => {
  switch (reportType) {
    case "summary": {
      const truncated = message.length > 150 ? `${message.substring(0, 150)}...` : message;
      return truncated.replace(/\n/g, " ");
    }
    case "detailed":
    default:
      return message;
  }
};
