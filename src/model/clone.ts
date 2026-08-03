/**
 * Deep clone with a fallback.
 *
 * `structuredClone` needs Chrome 98, Firefox 94 or Safari 15.4. That is fine for
 * a current machine and not fine for the older iPad sitting in a clinic room, or
 * a locked-down hospital desktop that has not been updated in three years. It is
 * used on the undo path, so if it is missing the app does not degrade, it breaks.
 *
 * The JSON fallback is safe here specifically because the network model is plain
 * JSON by construction: no Date, Map, Set or cyclic references anywhere. Keys
 * holding `undefined` are dropped rather than preserved, which is equivalent for
 * our purposes since reading a missing key also yields `undefined`.
 */
export function deepClone<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(value);
    } catch {
      /* fall through to JSON */
    }
  }
  return JSON.parse(JSON.stringify(value)) as T;
}
