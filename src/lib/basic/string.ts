
/**
 * Properly formats a JSON object to a string with right spacing and newlines
 * @param {object} json JSON Object to format
 * @returns {string} Proper formatted JSON string
 */
export function toProperJsonStringFormat(json: object): string {
  return JSON.stringify(json, null, 2);
}
