import { oneElementOf } from './oneElementOf';

// Properly type entries of an object.
// See https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries.
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][] & {};

/**
 * Returns one random entry from the object.
 *
 * @example
 * ```ts
 * oneEntryOf({ a: 1, b: 2, c: 3 }); // ['b', 2]
 * ```
 */
export function oneEntryOf<
  const T extends Record<string | number | symbol, unknown>,
>(object: T) {
  if (typeof object !== 'object' || object === null) {
    throw new TypeError('Expected an object');
  }

  const entries = Object.entries(object) as Entries<T>;

  if (entries.length === 0) {
    throw new Error('Object must have at least one entry.');
  }

  return oneElementOf(entries);
}
