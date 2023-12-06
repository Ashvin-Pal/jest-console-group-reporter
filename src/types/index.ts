export interface LogEntry {
  isCustomGroup: boolean;
  messages?: Set<string>;
  count: number;
  testFilePaths: Set<string>;
  stackTrace: string;
}

export type LogsEntryMap = Map<string, LogEntry>;

export type ConsoleTypes = keyof typeof console;

export type ConsoleMessagesMap = Map<ConsoleTypes, LogsEntryMap>;

export interface ConsoleMessage {
  type: ConsoleTypes;
  message: string;
  origin: string;
}

export type Matcher = string | RegExp | ((arg: ConsoleMessage) => boolean);

export interface DisplayOptions {
  enabled: boolean;
  filePaths: boolean;
  reportType: "summary" | "detailed";
}

export interface Options {
  filters: Array<Matcher>;
  groups: Array<{ match: Matcher; name: string }>;
  consoleLevels: ConsoleTypes[];
  afterEachTest: DisplayOptions;
  afterAllTests: DisplayOptions;
  useGitHubActions: boolean;
}

export type ColorTypes = ConsoleTypes | "stackTrace" | "number" | "default" | "filter";
