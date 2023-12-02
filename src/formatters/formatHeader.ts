import { styleMessageByType } from "@/style";
import { INDENT } from "../constants";
import { formatCount } from "./formatCount";
import type { ColorTypes } from "@/types";

/**
 * Used to format the header of the console message group
 * @example
 * formatHeader('error', 1) // '  ERROR 1'
 */
export const formatHeader = ({ type, count }: { type: ColorTypes; count: number }): string => {
  const consoleType = styleMessageByType({
    type,
    message: type.toUpperCase().padEnd(7),
    bold: true,
  });
  const formattedCount = formatCount(count);
  return `${INDENT.TITLE}${consoleType} ${formattedCount}`;
};
