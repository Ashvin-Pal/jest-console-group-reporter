# jest-console-group-reporter

A custom Jest reporter that automatically groups console messages by error message, allows you to filter messages, and provides flexible configuration options.

## Installation

You can install `jest-console-group-reporter` using your preferred package manager:

```console
# npm
npm install jest-console-group-reporter -D

# yarn
yarn add jest-console-group-reporter -D

# pnpm
pnpm add jest-console-group-reporter -D
```

## Usage

#### Basic configuration

To use jest-console-group-reporter with the default configuration, simply add it to your Jest configuration:

```js
// jest.config.js
module.exports = {
  // other jest config
  reporters: ["jest-console-group-reporter"],
};
```

#### Filtering certain messages

You can filter specific console messages by providing string, regular expression, or predicate function in the `filters` option:

```js
// jest.config.js

const filters = [
  "error", // Using string match operator "==="
  /^error/, // Using a regex expression"
  ({ type }) => type === "error", // Using a predicate function
];

module.exports = {
  // ...other Jest configuration
  reporters: [["jest-console-group-reporter", { filters }]],
};
```

#### Grouping certain messages

You can create custom message groups by specifying them in the `groups` option:

```js
// jest.config.js

const groups = [
  {
    name: "React Errors",
    match: /react/,
  },
  // Add more custom groups as needed
];

module.exports = {
  // ...other Jest configuration
  reporters: [["jest-console-group-reporter", { groups }]],
};
```

#### Dynamic group names

You can create custom message groups by specifying them in the `groups` option:

```js
// jest.config.js

const groups = [
  {
    name: ({ type }) => `React console.${type}`,
    match: /react/,
  },
  // Add more custom groups as needed
];

module.exports = {
  // ...other Jest configuration
  reporters: [["jest-console-group-reporter", { groups }]],
};
```

### Configuration

Here are the available configuration options for `jest-console-group-reporter`:

- **filters** (Array of Matchers): An array of regular expressions, strings, or custom functions to filter out specific console messages. Define custom filters using a constant and provide them in your Jest configuration as shown above.

- **groups** (Array of Group Objects): An array of custom groups, where each group has a `name` and a `match` property. Messages matching the `match` criteria will be grouped under the specified `name`.

- **consoleLevels** (Array of ConsoleTypes): An array of console message types to capture (e.g., 'log', 'warn', 'error').

- **afterEachTest** (DisplayOptions): Configuration for displaying messages after each test.

  - `enabled` (boolean): Enable or disable displaying messages after each test.
  - `filePaths` (boolean): Include file paths in the report.
  - `reportType` ("summary" | "detailed"): Choose between "summary" and "detailed" report types.

- **afterAllTests** (DisplayOptions): Configuration for displaying messages after all tests have run.

  - `enabled` (boolean): Enable or disable displaying messages after all tests.
  - `filePaths` (boolean): Include file paths in the report.
  - `reportType` ("summary" | "detailed"): Choose between "summary" and "detailed" report types.

- **useGitHubActions** (boolean): Enable GitHub Actions specific behavior.

Customize these options in your Jest configuration to tailor the reporter's behavior to your project's needs.
