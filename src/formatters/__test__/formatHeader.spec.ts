import type { ColorTypes } from "@/types";
import { formatHeader } from "../formatHeader";

describe.skip("formatHeader", () => {
  test.each`
    type       | count | expectedOutput
    ${"error"} | ${12} | ${"    [Bold-Red] ERROR   [Bold-White] 12   "}
    ${"error"} | ${0}  | ${"    [Bold-Red] ERROR   [Bold-White] 0    "}
    ${"warn"}  | ${0}  | ${"    [Bold-Yellow] WARN    [Bold-White] 0    "}
    ${"debug"} | ${12} | ${"    [Bold-Magenta] DEBUG   [Bold-White] 12   "}
    ${"log"}   | ${12} | ${"    [Bold-Cyan] LOG     [Bold-White] 12   "}
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
