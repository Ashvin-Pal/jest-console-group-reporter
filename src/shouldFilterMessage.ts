import type { Options, ConsoleMessage } from "@/types";

/**
 * Determines whether a console message should be filtered based on a set of provided filters.
 *
 * @example
 * Usage example:
 * const filters = ['error', /warning/, ({type}) => type === 'error'];
 * const consoleMessage = { message: 'error', type: 'error', origin: 'console' };
 * const shouldFilter = shouldFilterMessage(filters, consoleMessage); // returns true
 */
export function shouldFilterMessage(
  filters: Options["filters"],
  consoleMessage: ConsoleMessage
): boolean {
  return filters.some((filter) => {
    if (typeof filter === "string") {
      return consoleMessage.message === filter;
    }

    if (filter instanceof RegExp) {
      return filter.test(consoleMessage.message);
    }

    if (typeof filter === "function") {
      return filter({ ...consoleMessage });
    }

    return false;
  });
}
