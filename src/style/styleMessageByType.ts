import type { ColorTypes } from "@/types";
import { getColorFunctionByType } from "./getColorFunctionByType";

interface ColorMessageByConsoleType {
  type: ColorTypes;
  message: string;
  bold?: boolean;
}

export function styleMessageByType({
  type,
  message,
  bold = false,
}: ColorMessageByConsoleType): string {
  const colorFn = getColorFunctionByType(type);

  if (bold) {
    return colorFn.bold(message);
  }
  return colorFn(message);
}
