/**
 * Returns one random element from the array.
 *
 * @example
 * ```ts
 * oneElementOf([1, 2, 3]); // 2
 * ```
 */
export function oneElementOf<const T>(array: ReadonlyArray<T>): T {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array');
  }

  if (array.length === 0) {
    throw new Error('Expected a non-empty array');
  }

  return array[Math.floor(Math.random() * array.length)];
}
