import type { Options } from "@/types";
import { validateFilters, validateGroups } from "./validate";

interface InitialReporterOptions {
  filters?: Options["filters"];
  groups?: Options["groups"];
  consoleLevels?: Options["consoleLevels"];
  afterEachTest?: {
    enabled?: boolean;
    reportType?: Options["afterAllTests"]["reportType"];
    filePaths?: boolean;
  };
  afterAllTests?: {
    enabled?: boolean;
    reportType?: Options["afterAllTests"]["reportType"];
    filePaths?: boolean;
  };
  useGitHubActions?: boolean;
}

/**
 * Used to initialize the options object. As the reporter works with no configuration, this function
 * is used to set the default values for the options object.
 */
export function initializeOptions(initialOptions: InitialReporterOptions = {}): Options {
  const defaultOptions: Options = {
    consoleLevels: ["error", "warn", "info", "debug", "log"],
    filters: [],
    groups: [],
    afterEachTest: {
      enable: true,
      reportType: "summary",
      filePaths: false,
    },
    afterAllTests: {
      reportType: "detailed",
      enable: true,
      filePaths: true,
    },
    useGitHubActions: false,
  };

  validateFilters(initialOptions.filters);
  validateGroups(initialOptions.groups);

  return {
    ...defaultOptions,
    ...initialOptions,
    afterAllTests: {
      ...defaultOptions.afterAllTests,
      ...initialOptions.afterAllTests,
    },
    afterEachTest: {
      ...defaultOptions.afterEachTest,
      ...initialOptions.afterEachTest,
    },
  };
}
