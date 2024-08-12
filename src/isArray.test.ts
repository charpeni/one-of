import { expectTypeOf } from 'expect-type';

import { isArray } from './isArray';

describe('isArray', () => {
  it('should return true if the input is an array', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(['a', 'b', 'c'])).toBe(true);
  });

  it('should return false if the input is not an array', () => {
    expect(isArray(undefined)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(123)).toBe(false);
    expect(isArray('string')).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray({ length: 3 })).toBe(false);
  });

  it('should retain the type of the array', () => {
    const array: ReadonlyArray<number> = [1, 2, 3];
    const result = isArray(array);

    expectTypeOf(result).toEqualTypeOf<boolean>();
    expectTypeOf(array).toEqualTypeOf<ReadonlyArray<number>>();
  });
});
