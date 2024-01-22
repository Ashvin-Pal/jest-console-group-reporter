import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  reporters: [["jest-console-group-reporter", { useGitHubActions: true }]],
  setupFiles: ["./jest.setupMocks.ts"],
};

export default config;
