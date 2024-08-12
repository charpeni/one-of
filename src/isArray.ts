/**
 * Wrapper around `Array.isArray` to check if the input is an array,
 * but with a type guard rather than `any[]`.
 *
 * See: https://github.com/microsoft/TypeScript/issues/17002.
 */
export function isArray<T>(input: unknown): input is ReadonlyArray<T> {
  return Array.isArray(input);
}
