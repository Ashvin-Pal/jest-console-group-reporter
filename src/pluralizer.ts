/**
 * Determines the appropriate pluralization suffix for a given count.
 * Returns an empty string for singular (count of 1) and 's' for plural.
 *
 * @param {number} count - The number based on which to determine the pluralization.
 * @returns {string} An empty string for singular or 's' for plural.
 */
export function pluralizer(count: number): "s" | "" {
  switch (count) {
    case 1:
      return "";
    default:
      return "s";
  }
}
