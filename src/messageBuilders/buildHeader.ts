import { styleMessageByType } from "@/style";
import type { DisplayOptions } from "@/types";

/**
 * Builds the reporter header
 * @returns \u25cf Console messages:
 */
export const buildHeader = (displayOption: DisplayOptions): string => {
  return `\n ${styleMessageByType({
    type: "default",
    message: `\u25cf Console messages [${displayOption.reportType}]:`,
    bold: true,
  })}\n`;
};
