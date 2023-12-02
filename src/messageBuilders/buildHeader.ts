import { styleMessageByType } from "@/style";

/**
 * Builds the reporter header
 * @returns \u25cf Console messages:
 */
export const buildHeader = (): string => {
  return `\n ${styleMessageByType({
    type: "default",
    message: "\u25cf Console messages:",
    bold: true,
  })}\n`;
};
