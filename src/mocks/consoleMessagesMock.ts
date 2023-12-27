import type { ConsoleMessage } from "@/types";

export const consoleMessagesMock: ConsoleMessage[] = [
  {
    type: "error",
    message: "Network connection lost.",
    origin: "Network Module",
  },
  {
    type: "error",
    message: "Network connection lost.",
    origin: "Network Module",
  },
  {
    type: "error",
    message: "There was an error processing the data.",
    origin: "Server",
  },
  {
    type: "warn",
    message: "Server timeout.",
    origin: "Server",
  },
  {
    type: "warn",
    message: "Resource not found.",
    origin: "Resource Loader",
  },
  {
    type: "info",
    message: "User profile updated.",
    origin: "User Profile",
  },
  {
    type: "info",
    message:
      "This is an exceptionally lengthy info message. It ensures that extremely long messages are truncated when they exceed 150 characters in test summaries.",
    origin: "User Profile",
  },
  {
    type: "log",
    message: "This is a sample log message.",
    origin: "App",
  },
];
