import { INDENT } from "../constants";
import { styleMessageByType } from "@/style";

export const formatCount = (count: number): string => {
  const chars = count.toString();
  const chalked = styleMessageByType({ type: "number", message: chars, bold: true });
  const formatChars = chalked.length - chars.length;
  return chalked.padEnd(5 + formatChars, INDENT.TITLE);
};
