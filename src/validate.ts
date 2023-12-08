import type { Matcher, Options } from "@/types";

function isValidMatchType(match: Matcher): boolean {
  return match instanceof RegExp || typeof match === "function" || typeof match === "string";
}

export function validateGroups(groups: Options["groups"] | undefined): void {
  if (groups === undefined) return;

  if (!Array.isArray(groups)) {
    throw new Error("The groups option must be an array.");
  }

  groups.forEach(({ name, match }, index) => {
    if (!(typeof name === "string" || typeof name === "function")) {
      throw new Error(`Invalid name property at index ${index}: Expected a string or function.`);
    }

    if (!isValidMatchType(match)) {
      throw new Error(
        `Invalid match property at index ${index}: Expected a string, function, or RegExp.`
      );
    }
  });
}

export function validateFilters(filters: Options["filters"] | undefined): void {
  if (filters === undefined) return;

  if (!Array.isArray(filters)) {
    throw new Error("The filters option must be an array.");
  }

  filters.forEach((filter, index) => {
    if (!isValidMatchType(filter)) {
      throw new Error(`Invalid filter at index ${index}: Expected a string, function, or RegExp.`);
    }
  });
}
