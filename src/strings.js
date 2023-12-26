/**
 * Removes single/double quotes from a string as needed.
 * @param {String} s
 * @returns Cleaned string.
 */
export function cleanString(s) {
  s = s.trim();

  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    // value looks like a string, so let's assume it is
    s = s.substring(1, s.length - 1);
  }

  return s;
}

/**
 * A nicer substring to get the portion of a string between `from` and `to`.
 * @param {String} s
 * @param {String} from
 * @param {String} to
 * @returns A substring of the string between `from` and `to` arguments.
 */
export function substring(s, from, to) {
  if (!from && !to) {
    new Error("Invalid use of substring");
  }

  let sub = s;

  if (!from && to) {
    sub = s.substring(0, s.indexOf(to));
  } else if (from && !to) {
    sub = s.substring(s.indexOf(from) + from.length);
  } else {
    sub = s.substring(s.indexOf(from) + from.length, s.indexOf(to));
  }

  return sub.trim();
}
