import { expectTypeOf } from 'expect-type';

import { oneEntryOf } from './oneEntryOf';

describe('oneEntryOf', () => {
  let MockRandom: jest.SpyInstance<number, []>;

  beforeEach(() => {
    MockRandom = jest.spyOn(Math, 'random');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw a TypeError if the input is not an object', () => {
    expect(() => {
      // @ts-expect-error -- testing invalid input
      oneEntryOf('not an object');
    }).toThrow(TypeError);
  });

  it('should throw an Error if the object has no entries', () => {
    expect(() => {
      oneEntryOf({});
    }).toThrow(Error);
  });

  it('should return one random entry of the object', () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    const result = oneEntryOf(object);

    expect(Object.entries(object)).toContainEqual(result);
  });

  it('should return a value from array', () => {
    MockRandom.mockImplementationOnce(() => 0.1)
      .mockImplementationOnce(() => 0.25)
      .mockImplementationOnce(() => 0.5)
      .mockImplementationOnce(() => 0.99);

    const object = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };

    expect(oneEntryOf(object)).toEqual(['a', 1]);
    expect(oneEntryOf(object)).toEqual(['b', 2]);
    expect(oneEntryOf(object)).toEqual(['c', 3]);
    expect(oneEntryOf(object)).toEqual(['d', 4]);
  });

  it('should retain the type of the object', () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    } as const;

    const [key, value] = oneEntryOf(object);

    expectTypeOf(key).not.toEqualTypeOf<string>();
    expectTypeOf(key).toEqualTypeOf<keyof typeof object>();

    expectTypeOf(value).not.toEqualTypeOf<number>();
    expectTypeOf(value).toEqualTypeOf<(typeof object)[keyof typeof object]>();
  });

  it('should treat an inline object as readonly', () => {
    expectTypeOf(oneEntryOf({ a: 1, b: 2, c: 3, d: 4 })[0]).toEqualTypeOf<
      'a' | 'b' | 'c' | 'd'
    >();
    expectTypeOf(oneEntryOf({ a: 1, b: 2, c: 3, d: 4 })[1]).toEqualTypeOf<
      1 | 2 | 3 | 4
    >();
    expectTypeOf(
      oneEntryOf({ a: 'e', b: 'f', c: 'g', d: 'h' })[1],
    ).toEqualTypeOf<'e' | 'f' | 'g' | 'h'>();
  });
});
