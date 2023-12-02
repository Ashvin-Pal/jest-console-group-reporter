import type { ColorTypes } from "@/types";
import chalk, { type Chalk } from "chalk";

export const getColorFunctionByType = (type: ColorTypes): Chalk => {
  switch (type) {
    case "error":
      return chalk.reset.red;
    case "warn":
      return chalk.reset.yellow;
    case "log":
      return chalk.reset.cyan;
    case "info":
      return chalk.reset.blue;
    case "debug":
      return chalk.reset.magenta;
    case "stackTrace":
      return chalk.reset.gray;
    case "number":
    case "default":
    default:
      return chalk.reset.white;
  }
};
