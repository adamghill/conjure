import { cleanString } from "./strings.js";

/**
 * Parse an object. Handles strings, ints, dictionaries, etc.
 * @param {Object} obj
 * @returns Parsed object.
 */
export function parse(obj) {
  const cleanedString = cleanString(obj);

  if (cleanedString != obj) {
    return cleanedString;
  }

  try {
    if (CONJURE_USE_EVAL) {
      return eval?.(`"use strict";(${obj})`);
    } else {
      return JSON.parse(obj);
    }
  } catch {
    // Skip SyntaxError from JSON parse
    console.error(`[conjure] Invalid value: ${obj}`);
  }
}
