import { isArray } from './isArray';
import { oneElementOf } from './oneElementOf';
import { oneEntryOf } from './oneEntryOf';

/**
 * Returns one random element from the array or one random entry from the object.
 *
 * For more specific functions, see `oneElementOf` and `oneEntryOf`.
 *
 * @example
 * ```ts
 * oneOf([1, 2, 3]); // 2
 * oneOf({ a: 1, b: 2, c: 3 }); // ['b', 2]
 * ```
 */
export function oneOf<const A>(
  input: Parameters<typeof oneElementOf<A>>[0],
): ReturnType<typeof oneElementOf<A>>;
export function oneOf<
  const O extends Record<string | number | symbol, unknown>,
>(input: Parameters<typeof oneEntryOf<O>>[0]): ReturnType<typeof oneEntryOf<O>>;
export function oneOf<
  const A,
  const O extends Record<string | number | symbol, unknown>,
>(
  input:
    | Parameters<typeof oneElementOf<A>>[0]
    | Parameters<typeof oneEntryOf<O>>[0],
) {
  if (isArray(input)) {
    return oneElementOf(input);
  }

  if (typeof input === 'object' && input !== null) {
    return oneEntryOf(input);
  }

  throw new TypeError('Expected an array or object');
}
