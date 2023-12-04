import { mergeConsoleMaps } from "../mergeConsoleMaps";
import type { ConsoleMessagesMap } from "@/types";

const aggregatedConsoleMessagesMap: ConsoleMessagesMap = new Map([
  [
    "error",
    new Map([
      [
        "Error message 1",
        {
          count: 12,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file1"]),
        },
      ],
      [
        "Error message 2",
        {
          count: 1,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file"]),
        },
      ],
    ]),
  ],
]);

const consoleMessagesMap: ConsoleMessagesMap = new Map([
  [
    "error",
    new Map([
      [
        "Error message 1",
        {
          count: 12,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file2"]),
        },
      ],
      [
        "Error message 3",
        {
          count: 1,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file"]),
        },
      ],
    ]),
  ],
  [
    "warn",
    new Map([
      [
        "Wrning message 1",
        {
          count: 12,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file2"]),
        },
      ],
    ]),
  ],
]);

const expectedOutput = new Map([
  [
    "error",
    new Map([
      [
        "Error message 1",
        {
          count: 24,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file1", "path/to/test/file2"]),
        },
      ],
      [
        "Error message 2",
        {
          count: 1,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file"]),
        },
      ],
      [
        "Error message 3",
        {
          count: 1,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file"]),
        },
      ],
    ]),
  ],
  [
    "warn",
    new Map([
      [
        "Wrning message 1",
        {
          count: 12,
          isCustomGroup: false,
          stackTrace: "Some stack trace",
          testFilePaths: new Set(["path/to/test/file2"]),
        },
      ],
    ]),
  ],
]);

describe("mergeConsoleMaps", () => {
  test("Should merge console maps correctly without mutating input arguments", () => {
    const mergedMaps = mergeConsoleMaps(aggregatedConsoleMessagesMap, consoleMessagesMap);
    expect(mergedMaps).toStrictEqual(expectedOutput);

    expect(aggregatedConsoleMessagesMap).toStrictEqual(
      new Map([
        [
          "error",
          new Map([
            [
              "Error message 1",
              {
                count: 12,
                isCustomGroup: false,
                stackTrace: "Some stack trace",
                testFilePaths: new Set(["path/to/test/file1"]),
              },
            ],
            [
              "Error message 2",
              {
                count: 1,
                isCustomGroup: false,
                stackTrace: "Some stack trace",
                testFilePaths: new Set(["path/to/test/file"]),
              },
            ],
          ]),
        ],
      ])
    );

    expect(consoleMessagesMap).toStrictEqual(
      new Map([
        [
          "error",
          new Map([
            [
              "Error message 1",
              {
                count: 12,
                isCustomGroup: false,
                stackTrace: "Some stack trace",
                testFilePaths: new Set(["path/to/test/file2"]),
              },
            ],
            [
              "Error message 3",
              {
                count: 1,
                isCustomGroup: false,
                stackTrace: "Some stack trace",
                testFilePaths: new Set(["path/to/test/file"]),
              },
            ],
          ]),
        ],
        [
          "warn",
          new Map([
            [
              "Wrning message 1",
              {
                count: 12,
                isCustomGroup: false,
                stackTrace: "Some stack trace",
                testFilePaths: new Set(["path/to/test/file2"]),
              },
            ],
          ]),
        ],
      ])
    );
  });
});
