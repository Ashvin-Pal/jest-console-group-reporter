import { initializeOptions } from "../initializeOptions";
import type { ConsoleMessage, Options } from "@/types";

describe("initializeOptions", () => {
  // Default options for reference
  const defaultOptions: Options = {
    consoleLevels: ["error", "warn", "info", "debug", "log"],
    filters: [],
    groups: [],
    afterEachTest: {
      reportType: "summary",
      enabled: true,
      filePaths: false,
    },
    afterAllTests: {
      reportType: "detailed",
      enabled: true,
      filePaths: true,
    },
    useGitHubActions: false,
  };

  test("Should use default options when no custom options are provided", () => {
    const options = initializeOptions();
    expect(options).toEqual(defaultOptions);
  });

  test("Should override default options with custom options", () => {
    const customOptions = {
      groups: [{ name: "test", match: /test/ }],
      afterEachTest: {
        enabled: false,
      },
      afterAllTests: {},
      useGitHubActions: true,
    };

    const expected = {
      ...defaultOptions,
      groups: [{ name: "test", match: /test/ }],
      afterEachTest: {
        ...defaultOptions.afterEachTest,
        enabled: false,
      },
      afterAllTests: {
        ...defaultOptions.afterAllTests,
      },
      useGitHubActions: true,
    };
    const options = initializeOptions(customOptions);
    expect(options).toEqual(expected);
  });

  test("Should merge partial custom options with default options", () => {
    const customOptions = {
      afterEachTest: {
        reportType: "detailed",
      },
    } as const;

    const expected = {
      ...defaultOptions,
      afterEachTest: {
        ...defaultOptions.afterEachTest,
        reportType: "detailed",
      },
    };
    const options = initializeOptions(customOptions);
    expect(options).toEqual(expected);
  });

  test.each`
    filters | errorMessage
    ${{}}   | ${"The filters option must be an array."}
    ${""}   | ${"The filters option must be an array."}
    ${null} | ${"The filters option must be an array."}
    ${[1]}  | ${"Invalid filter at index 0: Expected a string, function, or RegExp."}
  `(
    "Should throw an error when invalid filters option is provided",
    ({ filters, errorMessage }: { filters: Options["filters"]; errorMessage: string }) => {
      expect(() => initializeOptions({ filters })).toThrow(errorMessage);
    }
  );

  test.each`
    groups                                                                              | errorMessage
    ${""}                                                                               | ${"The groups option must be an array."}
    ${{}}                                                                               | ${"The groups option must be an array."}
    ${["not an object"]}                                                                | ${"Invalid name property at index 0: Expected a string or function."}
    ${[{ match: /Something/ }]}                                                         | ${"Invalid name property at index 0: Expected a string or function."}
    ${[{ name: undefined, match: /Something/ }]}                                        | ${"Invalid name property at index 0: Expected a string or function."}
    ${[{ name: {}, match: /Something/ }]}                                               | ${"Invalid name property at index 0: Expected a string or function."}
    ${[{ name: "React errors", match: undefined }]}                                     | ${"Invalid match property at index 0: Expected a string, function, or RegExp."}
    ${[{ name: "React errors", match: null }]}                                          | ${"Invalid match property at index 0: Expected a string, function, or RegExp."}
    ${[{ name: ({ type }: ConsoleMessage): string => `console.${type}`, match: null }]} | ${"Invalid match property at index 0: Expected a string, function, or RegExp."}
  `(
    "should throw an error when invalid groups option is provided",
    ({ groups, errorMessage }: { groups: Options["groups"]; errorMessage: string }) => {
      expect(() => initializeOptions({ groups })).toThrow(errorMessage);
    }
  );
});
