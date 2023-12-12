import { shouldFilterMessage } from "../shouldFilterMessage";
import type { ConsoleMessage, Options } from "@/types";

const errorConsoleMessage = { message: "error", type: "error", origin: "console" };
const errorTypePredicateFn = ({ type }: ConsoleMessage): boolean => type === "error";
const messageTypePredicateFn = ({ message }: ConsoleMessage): boolean => /^error/.test(message);
const originTypePredicateFn = ({ origin }: ConsoleMessage): boolean => /^console/.test(origin);

describe("shouldFilterMessage", () => {
  test.each`
    filters              | consoleMessage         | expectedOutput
    ${["error"]}         | ${errorConsoleMessage} | ${true}
    ${["warn"]}          | ${errorConsoleMessage} | ${false}
    ${["warn", "error"]} | ${errorConsoleMessage} | ${true}
  `(
    "filters out messages correctly when matching a string filter",
    ({
      filters,
      consoleMessage,
      expectedOutput,
    }: {
      filters: Options["filters"];
      consoleMessage: ConsoleMessage;
      expectedOutput: boolean;
    }) => {
      expect(shouldFilterMessage(filters, consoleMessage)).toBe(expectedOutput);
    }
  );

  test.each`
    filters              | consoleMessage         | expectedOutput
    ${[/error/]}         | ${errorConsoleMessage} | ${true}
    ${[/warn/]}          | ${errorConsoleMessage} | ${false}
    ${[/warn/, /error/]} | ${errorConsoleMessage} | ${true}
  `(
    "filters out messages correctly when matching a regex expression",
    ({
      filters,
      consoleMessage,
      expectedOutput,
    }: {
      filters: Options["filters"];
      consoleMessage: ConsoleMessage;
      expectedOutput: boolean;
    }) => {
      expect(shouldFilterMessage(filters, consoleMessage)).toBe(expectedOutput);
    }
  );

  test.each`
    filters                                          | consoleMessage                                                     | expectedOutput
    ${[errorTypePredicateFn]}                        | ${{ message: "error message", type: "error", origin: "console" }}  | ${true}
    ${[messageTypePredicateFn]}                      | ${{ message: "error message", type: "warn", origin: "console" }}   | ${true}
    ${[errorTypePredicateFn, originTypePredicateFn]} | ${{ message: "error message", type: "error", origin: "console" }}  | ${true}
    ${[errorTypePredicateFn]}                        | ${{ message: "info message", type: "warn", origin: "console" }}    | ${false}
    ${[messageTypePredicateFn]}                      | ${{ message: "must not match", type: "error", origin: "console" }} | ${false}
    ${[errorTypePredicateFn, originTypePredicateFn]} | ${{ message: "error message", type: "warn", origin: "nowhere" }}   | ${false}
  `(
    "filters out messages correctly when using a predicate function",
    ({
      filters,
      consoleMessage,
      expectedOutput,
    }: {
      filters: Options["filters"];
      consoleMessage: ConsoleMessage;
      expectedOutput: boolean;
    }) => {
      expect(shouldFilterMessage(filters, consoleMessage)).toBe(expectedOutput);
    }
  );
});
