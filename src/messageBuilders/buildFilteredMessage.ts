import { formatHeader } from "@/formatters";
import { pluralizer } from "../pluralizer";

/**
 * Used to build the filtered message string.
 * @example
 * buildFilteredMessage(1) // '  FILTER 1 Successfully filtered 1 message.'
 */
export function buildFilteredMessage(count: number): string {
  const formattedHeader = formatHeader({ type: "filter", count });
  return `${formattedHeader}Successfully filtered ${count} message${pluralizer(count)}.`;
}
