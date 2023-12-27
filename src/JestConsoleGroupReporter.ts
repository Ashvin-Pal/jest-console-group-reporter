import {
  DefaultReporter,
  SummaryReporter,
  type TestResult,
  type AggregatedResult,
  type ReporterOnStartOptions,
  type Config,
  type TestContext,
} from "@jest/reporters";
import type { DisplayOptions, ConsoleMessagesMap, Options } from "@/types";
import { buildConsoleMessages, buildFilteredMessage, buildHeader } from "@/messageBuilders";
import { mergeConsoleMaps } from "@/mergeConsoleMaps";
import { processConsoleMessages } from "./processConsoleMessages";
import { initializeOptions } from "./initializeOptions";

export class JestConsoleGroupReporter extends DefaultReporter {
  private aggregatedConsoleMessagesMap: ConsoleMessagesMap;
  private filteredMessageCount = 0;
  private jestGlobalConfig: Config.GlobalConfig;
  private options: Options;
  private testSummaryReporter: SummaryReporter;

  constructor(globalConfig: Config.GlobalConfig, options: Options) {
    super(globalConfig);
    this.jestGlobalConfig = globalConfig;
    this.options = initializeOptions(options);
    this.aggregatedConsoleMessagesMap = new Map();
    this.testSummaryReporter = new SummaryReporter(globalConfig);
  }

  /**
   * Called by Jest once when the test run starts.
   */
  public override onRunStart(
    aggregatedResults: AggregatedResult,
    options: ReporterOnStartOptions
  ): void {
    super.onRunStart(aggregatedResults, options);
    this.testSummaryReporter.onRunStart(aggregatedResults, options);
  }

  /**
   * Called once by Jest after all tests are completed.
   */
  // @ts-expect-error https://github.com/microsoft/TypeScript/issues/54426
  public override onRunComplete(
    testContexts: Set<TestContext>,
    aggregatedResults: AggregatedResult
  ): void {
    this.handleReporting({
      consoleMessagesMap: this.aggregatedConsoleMessagesMap,
      filteredCount: this.filteredMessageCount,
      displayOption: this.options.afterAllTests,
      type: "afterAllTests",
    });
    super.onRunComplete();
    this.testSummaryReporter.onRunComplete(testContexts, aggregatedResults);
  }

  /**
   * Intercepts the Jest default reporter to control how console messages are displayed in the terminal.
   */
  public override printTestFileHeader(
    testPath: string,
    config: Config.ProjectConfig,
    testResult: TestResult
  ): void {
    const { consoleMessagesMap, filteredCount } = this.processTestResult(config, testResult);
    this.storeConsoleMessages(consoleMessagesMap);
    this.storeFilteredCount(filteredCount);
    super.printTestFileHeader(testPath, config, this.stripConsoleMessagesFromResults(testResult));
    this.handleReporting({
      consoleMessagesMap,
      filteredCount,
      displayOption: this.options.afterEachTest,
      type: "afterEachTest",
    });
  }

  /**
   * Orchestrates the various reporting sections by determining whether to display reports
   * based on the given display options and then delegating to specific reporting functions.
   */
  private handleReporting({
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

  /**
   * Displays the report header based on the specified reporting context ('afterAllTests' or 'afterEachTest').
   * Utilizes the 'buildHeader' function to construct the header content.
   */
  private displayReportHeader(
    headerFor: keyof Pick<Options, "afterAllTests" | "afterEachTest">
  ): void {
    this.log(buildHeader(headerFor));
  }

  /**
   * Inserts a blank line as a separator in the test output to enhance readability.
   * This method is typically used to visually delineate between sections of the report.
   */
  private insertTestSeparator(): void {
    this.log("");
  }

  /**
   * Displays the formatted console messages based on the provided map and display options.
   */
  private displayLogReport(consoleMap: ConsoleMessagesMap, displayOptions: DisplayOptions): void {
    const consoleMessages = buildConsoleMessages({ consoleMap, displayOptions, ...this.options });
    this.log(consoleMessages.join("\n"));
  }

  /**
   * Removes console messages from the test results, setting them to undefined as the Jest
   * default reporter expects undefined when there are no console messages to display.
   */
  private stripConsoleMessagesFromResults(testResult: TestResult): TestResult {
    return { ...testResult, console: undefined };
  }

  /**
   * Increments the count of filtered out messages by the given number.
   * This is used to keep track of the number of messages filtered out based on user configuration.
   */
  private storeFilteredCount(filteredOut: number): void {
    this.filteredMessageCount += filteredOut;
  }

  /**
   * Merges new console messages into the existing aggregated console messages map.
   * This ensures all console messages are accounted for in the final report.
   */
  private storeConsoleMessages(consoleMessagesMap: ConsoleMessagesMap): void {
    this.aggregatedConsoleMessagesMap = mergeConsoleMaps(
      this.aggregatedConsoleMessagesMap,
      consoleMessagesMap
    );
  }

  /**
   * Displays the count of filtered out messages if there are any.
   * It's used to inform users about the number of messages not displayed due to filtering.
   */
  private displayFilteredCount(filteredOut: number): void {
    if (filteredOut) {
      this.log(buildFilteredMessage(filteredOut));
    }
  }

  /**
   * Processes the test result to produce a console messages map and the count of filtered messages.
   * It adapts the test result into a structured format for reporting purposes.
   */
  private processTestResult(
    config: Config.ProjectConfig,
    testResult: TestResult
  ): {
    consoleMessagesMap: ConsoleMessagesMap;
    filteredCount: number;
  } {
    return processConsoleMessages({ ...testResult, ...this.options, config });
  }
}
