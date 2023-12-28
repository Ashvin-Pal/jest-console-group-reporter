import { type Config } from "@jest/reporters";
import { createLogEntry } from "@/logEntry";

describe("createLogObject", () => {
  const testFilePath = "path\\to\\test\\file";
  const message = "Test message";
  const origin = "Test stack trace";
  const config = {} as Config.ProjectConfig;

  test("Should correctly handle isCustomGroup true", () => {
    const log = createLogEntry({ isCustomGroup: true, message, testFilePath, origin, config });

    expect(log.isCustomGroup).toBe(true);
    expect(log.count).toBe(1);
    expect(Array.from(log.testFilePaths)).toStrictEqual([testFilePath]);
    expect(Array.from(log.messages || [])).toStrictEqual([message]);
  });

  test("Should correctly handle isCustomGroup false", () => {
    const log = createLogEntry({ isCustomGroup: false, message, testFilePath, origin, config });

    expect(log.isCustomGroup).toBe(false);
    expect(log.count).toBe(1);
    expect(Array.from(log.testFilePaths)).toStrictEqual([testFilePath]);
  });
});
