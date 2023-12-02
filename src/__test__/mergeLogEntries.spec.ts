import { mergeLogEntries } from "@/logEntry";
import type { LogEntry } from "@/types";

describe("mergeLogEntries", () => {
  test("Correctly sums counts and merges testFilePaths", () => {
    const log1: LogEntry = {
      isCustomGroup: false,
      count: 5,
      testFilePaths: new Set(["path1", "path2"]),
      stackTrace: "stack1",
    };

    const log2: LogEntry = {
      isCustomGroup: false,
      count: 3,
      testFilePaths: new Set(["path2", "path3"]),
      stackTrace: "stack2",
    };

    const result = mergeLogEntries(log1, log2);
    expect(result).toStrictEqual({
      isCustomGroup: false,
      count: 8,
      testFilePaths: new Set(["path1", "path2", "path3"]),
      stackTrace: "stack1",
    });
  });

  test('Merges messages when property "isCustomGroup" is true', () => {
    const log1: LogEntry = {
      isCustomGroup: true,
      messages: new Set(["msg1", "msg2"]),
      count: 1,
      testFilePaths: new Set(["path1"]),
      stackTrace: "stack1",
    };

    const log2: LogEntry = {
      isCustomGroup: true,
      messages: new Set(["msg2", "msg3"]),
      count: 2,
      testFilePaths: new Set(["path2"]),
      stackTrace: "stack2",
    };

    const result = mergeLogEntries(log1, log2);
    expect(result).toStrictEqual({
      isCustomGroup: true,
      count: 3,
      testFilePaths: new Set(["path1", "path2"]),
      messages: new Set(["msg1", "msg2", "msg3"]),
      stackTrace: "stack1",
    });
  });
});
