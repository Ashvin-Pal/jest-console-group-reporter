import type { ColorTypes } from "@/types";
import { formatHeader } from "../formatHeader";

describe("formatHeader", () => {
  test.each`
    type       | count | expectedOutput
    ${"error"} | ${12} | ${"    \u001b[0m\u001b[31m\u001b[1mERROR  \u001b[22m\u001b[39m\u001b[0m \u001b[0m\u001b[37m\u001b[1m12\u001b[22m\u001b[39m\u001b[0m   "}
    ${"error"} | ${0}  | ${"    \u001b[0m\u001b[31m\u001b[1mERROR  \u001b[22m\u001b[39m\u001b[0m \u001b[0m\u001b[37m\u001b[1m0\u001b[22m\u001b[39m\u001b[0m    "}
    ${"warn"}  | ${0}  | ${"    \u001b[0m\u001b[33m\u001b[1mWARN   \u001b[22m\u001b[39m\u001b[0m \u001b[0m\u001b[37m\u001b[1m0\u001b[22m\u001b[39m\u001b[0m    "}
    ${"debug"} | ${12} | ${"    \u001b[0m\u001b[35m\u001b[1mDEBUG  \u001b[22m\u001b[39m\u001b[0m \u001b[0m\u001b[37m\u001b[1m12\u001b[22m\u001b[39m\u001b[0m   "}
    ${"log"}   | ${12} | ${"    \u001b[0m\u001b[36m\u001b[1mLOG    \u001b[22m\u001b[39m\u001b[0m \u001b[0m\u001b[37m\u001b[1m12\u001b[22m\u001b[39m\u001b[0m   "}
  `(
    "Should format header correctly",
    ({
      type,
      count,
      expectedOutput,
    }: {
      type: ColorTypes;
      count: number;
      expectedOutput: string;
    }) => {
      const formattedHeader = formatHeader({ type, count });
      expect(formattedHeader).toEqual(expectedOutput);
    }
  );
});
