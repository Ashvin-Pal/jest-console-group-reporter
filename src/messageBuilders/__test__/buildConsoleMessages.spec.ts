import type { Config } from "@jest/reporters";
import { buildConsoleMessages } from "../buildConsoleMessages";
import { consoleMessagesMock } from "../../mocks";
import { processConsoleMessages } from "../../processConsoleMessages";

const testFilePath = "test.js";
const config = { projectRoot: "./" } as unknown as Config.ProjectConfig;

describe("buildConsoleMessages", () => {
  test("Build [summary] console messages correctly when there are no group configurations", () => {
    const { consoleMessagesMap } = processConsoleMessages({
      filters: [],
      groups: [],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    expect(
      buildConsoleMessages({
        consoleMap: consoleMessagesMap,
        consoleLevels: ["error", "warn", "log", "info", "log"],
        useGitHubActions: false,
        displayOptions: {
          enabled: true,
          filePaths: false,
          reportType: "summary",
        },
      })
    ).toMatchSnapshot();
  });

  test("Build [summary] console messages correctly when there are group configurations", () => {
    const { consoleMessagesMap } = processConsoleMessages({
      filters: [],
      groups: [
        {
          name: "Error group",
          match: ({ type }): boolean => type === "error",
        },
      ],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    expect(
      buildConsoleMessages({
        consoleMap: consoleMessagesMap,
        consoleLevels: ["error", "warn", "log", "info", "debug"],
        useGitHubActions: false,
        displayOptions: {
          enabled: true,
          filePaths: false,
          reportType: "summary",
        },
      })
    ).toMatchSnapshot();
  });

  test("Build [detailed] console messages correctly when there are group configurations", () => {
    const { consoleMessagesMap } = processConsoleMessages({
      filters: [],
      groups: [],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    expect(
      buildConsoleMessages({
        consoleMap: consoleMessagesMap,
        consoleLevels: ["error", "warn", "log", "info", "log"],
        useGitHubActions: false,
        displayOptions: {
          enabled: true,
          filePaths: true,
          reportType: "detailed",
        },
      })
    ).toMatchSnapshot();
  });

  test("Build [detailed] console messages correctly when there are group configurations", () => {
    const { consoleMessagesMap } = processConsoleMessages({
      filters: [],
      groups: [
        {
          name: "Error group",
          match: ({ type }): boolean => type === "error",
        },
      ],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    expect(
      buildConsoleMessages({
        consoleMap: consoleMessagesMap,
        consoleLevels: ["error", "warn", "log", "info", "debug"],
        useGitHubActions: false,
        displayOptions: {
          enabled: true,
          filePaths: true,
          reportType: "detailed",
        },
      })
    ).toMatchSnapshot();
  });

  test("Build [detailed] console messages correctly when using the useGithubActions configuration", () => {
    const { consoleMessagesMap } = processConsoleMessages({
      filters: [],
      groups: [
        {
          name: "Error group",
          match: ({ type }): boolean => type === "error",
        },
      ],
      testFilePath,
      // @ts-expect-error Issues with jest type
      console: consoleMessagesMock,
      config,
    });

    expect(
      buildConsoleMessages({
        consoleMap: consoleMessagesMap,
        consoleLevels: ["error", "warn", "log", "info", "debug"],
        useGitHubActions: true,
        displayOptions: {
          enabled: true,
          filePaths: true,
          reportType: "detailed",
        },
      })
    ).toMatchSnapshot();
  });
});
