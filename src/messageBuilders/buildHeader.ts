import { styleMessageByType } from "@/style";
import type { Options } from "@/types";

/**
 * Builds the reporter header
 * @returns \u25cf Console Messages: Test Summary | \u25cf Console Messages: All Test Summary
 */
export const buildHeader = (
  headerFor: keyof Pick<Options, "afterAllTests" | "afterEachTest">
): string => {
  const header = headerFor === "afterEachTest" ? "Test Summary" : "All Test Summary";
  return `\n ${styleMessageByType({
    type: "default",
    message: `\u25cf Console Messages: ${header}`,
    bold: true,
  })}\n`;
};
