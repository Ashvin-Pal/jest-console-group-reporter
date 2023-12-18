import {
  DefaultReporter,
  SummaryReporter,
  type TestResult,
  type AggregatedResult,
  type ReporterOnStartOptions,
  type Config,
  type TestContext,
} from "@jest/reporters";
import { buildConsoleMessages, buildFilteredMessage, buildHeader } from "@/messageBuilders";
import { mergeConsoleMaps } from "@/mergeConsoleMaps";
import type { DisplayOptions, ConsoleMessagesMap, Options } from "@/types";
import { processConsoleMessages } from "./processConsoleMessages";
import { initializeOptions } from "./initializeOptions";

export class JestConsoleGroupReporter extends DefaultReporter {
  aggregatedConsoleMessagesMap: ConsoleMessagesMap;
  filteredMessageCount = 0;
  _jestGlobalConfig: Config.GlobalConfig;
  _options: Options;
  testSummaryReporter: SummaryReporter;

  constructor(globalConfig: Config.GlobalConfig, options: Options) {
    super(globalConfig);
    this._jestGlobalConfig = globalConfig;
    this._options = initializeOptions(options);
    this.aggregatedConsoleMessagesMap = new Map();
    this.testSummaryReporter = new SummaryReporter(globalConfig);
  }

  /**
   * Called by Jest once when the test run starts.
   */
  override onRunStart(aggregatedResults: AggregatedResult, options: ReporterOnStartOptions): void {
    super.onRunStart(aggregatedResults, options);
    this.testSummaryReporter.onRunStart(aggregatedResults, options);
  }

  /**
   * Called once by Jest once after all test is completed.
   */
  // @ts-expect-error https://github.com/microsoft/TypeScript/issues/54426
  override onRunComplete(
    testContexts: Set<TestContext>,
    aggregatedResults: AggregatedResult
  ): void {
    this.handleReporting({
      consoleMessagesMap: this.aggregatedConsoleMessagesMap,
      filteredCount: this.filteredMessageCount,
      displayOption: this._options.afterAllTests,
      type: "afterAllTests",
    });
    super.onRunComplete();
    this.testSummaryReporter.onRunComplete(testContexts, aggregatedResults);
  }

  override printTestFileHeader(
    testPath: string,
    config: Config.ProjectConfig,
    testResult: TestResult
  ): void {
    const { consoleMessagesMap, filteredCount } = this.processTestResult(config, testResult);
    this.storeConsoleMesages(consoleMessagesMap);
    this.storeFilteredCount(filteredCount);
    super.printTestFileHeader(testPath, config, this.stripConsoleMessagesFromResults(testResult));
    this.handleReporting({
      consoleMessagesMap,
      filteredCount,
      displayOption: this._options.afterEachTest,
      type: "afterEachTest",
    });
  }

  handleReporting({
    consoleMessagesMap,
    filteredCount,
    displayOption,
    type,
  }: {
    consoleMessagesMap: ConsoleMessagesMap;
    filteredCount: number;
    displayOption: DisplayOptions;
    type: keyof Pick<Options, "afterAllTests" | "afterEachTest">;
  }): void {
    const shouldDisplay = displayOption.enabled && (consoleMessagesMap.size || filteredCount);

    if (shouldDisplay) {
      this.displayReportHeader(type);
      this.displayLogReport(consoleMessagesMap, displayOption);
      this.displayFilteredCount(filteredCount);
      this.insertTestSeparator();
    }
  }

  displayReportHeader(headerFor: keyof Pick<Options, "afterAllTests" | "afterEachTest">): void {
    this.log(buildHeader(headerFor));
  }

  insertTestSeparator(): void {
    this.log("");
  }

  displayLogReport(consoleMap: ConsoleMessagesMap, displayOptions: DisplayOptions): void {
    const consoleMessages = buildConsoleMessages({ consoleMap, displayOptions, ...this._options });
    this.log(consoleMessages.join("\n"));
  }

  stripConsoleMessagesFromResults(testResult: TestResult): TestResult {
    return { ...testResult, console: undefined };
  }

  storeFilteredCount(filteredOut: number): void {
    this.filteredMessageCount += filteredOut;
  }

  storeConsoleMesages(consoleMessagesMap: ConsoleMessagesMap): void {
    this.aggregatedConsoleMessagesMap = mergeConsoleMaps(
      this.aggregatedConsoleMessagesMap,
      consoleMessagesMap
    );
  }

  displayFilteredCount(filteredOut: number): void {
    if (filteredOut) {
      this.log(buildFilteredMessage(filteredOut));
    }
  }

  processTestResult(
    config: Config.ProjectConfig,
    testResult: TestResult
  ): {
    consoleMessagesMap: ConsoleMessagesMap;
    filteredCount: number;
  } {
    return processConsoleMessages({ ...testResult, ...this._options, config });
  }
}
