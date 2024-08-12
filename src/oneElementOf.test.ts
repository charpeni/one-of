import { expectTypeOf } from 'expect-type';

import { oneElementOf } from './oneElementOf';

describe('oneElementOf', () => {
  let MockRandom: jest.SpyInstance<number, []>;

  beforeEach(() => {
    MockRandom = jest.spyOn(Math, 'random');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw a TypeError if the input is not an array', () => {
    expect(() => {
      // @ts-expect-error -- testing invalid input
      oneElementOf('not an array');
    }).toThrow(TypeError);
  });

  it('should throw an Error if the input array is empty', () => {
    expect(() => {
      oneElementOf([]);
    }).toThrow(Error);
  });

  it('should return one element of the array', () => {
    const possibilities = [0, 1, 2, 3, 4];
    const result = oneElementOf(possibilities);

    expect(possibilities).toContain(result);
  });

  it('should return a value from array', () => {
    MockRandom.mockImplementationOnce(() => 0.1)
      .mockImplementationOnce(() => 0.25)
      .mockImplementationOnce(() => 0.5)
      .mockImplementationOnce(() => 0.99);

    const array = [1, 2, 3, 4];

    expect(oneElementOf(array)).toBe(1);
    expect(oneElementOf(array)).toBe(2);
    expect(oneElementOf(array)).toBe(3);
    expect(oneElementOf(array)).toBe(4);
  });

  it('should retain the type of the array', () => {
    const array = [1, 2, 3, 4] as const;

    expectTypeOf(oneElementOf(array)).not.toEqualTypeOf<number>();
    expectTypeOf(oneElementOf(array)).toEqualTypeOf<(typeof array)[number]>();
  });

  it('should treat an inline array as readonly', () => {
    expectTypeOf(oneElementOf([1, 2, 3, 4])).toEqualTypeOf<1 | 2 | 3 | 4>();
    expectTypeOf(oneElementOf(['A', 'B', 'C', 'D'])).toEqualTypeOf<
      'A' | 'B' | 'C' | 'D'
    >();
  });
});
