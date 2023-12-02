import { INDENT } from "../constants";
import { pluralizer } from "../pluralizer";
import type { LogEntry } from "@/types";

export const formatTestFilePaths = ({
  testFilePaths,
}: {
  testFilePaths: LogEntry["testFilePaths"];
}): string => {
  const testFilePathsArray = Array.from(testFilePaths);
  const header = `${INDENT.TITLE}Test File Path${pluralizer(testFilePathsArray.length)}:\n`;
  const filePaths = testFilePathsArray
    .map((path, index) => `${INDENT.CONSOLE}${index + 1}. ${path}`)
    .join("\n");

  return `\n${header}${filePaths}\n`;
};
