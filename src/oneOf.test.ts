import { expectTypeOf } from 'expect-type';

import * as oneElementOfModule from './oneElementOf';
import * as oneEntryOfModule from './oneEntryOf';
import { oneOf } from './oneOf';

describe('oneOf', () => {
  let oneElementOfSpy: jest.SpyInstance;
  let oneEntryOfSpy: jest.SpyInstance;

  beforeEach(() => {
    oneElementOfSpy = jest.spyOn(oneElementOfModule, 'oneElementOf');
    oneEntryOfSpy = jest.spyOn(oneEntryOfModule, 'oneEntryOf');
  });

  afterEach(() => {
    jest.clearAllMocks();

    oneElementOfSpy.mockRestore();
    oneEntryOfSpy.mockRestore();
  });

  it('should call oneElementOf when input is an array', () => {
    const input = [1, 2, 3];
    oneOf(input);

    expect(oneElementOfSpy).toHaveBeenCalledWith(input);
    expect(oneEntryOfSpy).not.toHaveBeenCalled();
  });

  it('should call oneEntryOf when input is an object', () => {
    // `oneEntryOf` calls `oneElementOf` internally, so let's mock the implementation
    oneEntryOfSpy.mockImplementation(() => ['a', 1]);

    const input = { a: 1, b: 2, c: 3 };
    oneOf(input);

    expect(oneEntryOfSpy).toHaveBeenCalledWith(input);
    expect(oneElementOfSpy).not.toHaveBeenCalled();
  });

  it('should throw a TypeError when input is neither an array nor an object', () => {
    const input = 'not an array or object';

    expect(() => {
      // @ts-expect-error -- testing invalid input
      oneOf(input);
    }).toThrow(TypeError);

    expect(oneElementOfSpy).not.toHaveBeenCalled();
    expect(oneEntryOfSpy).not.toHaveBeenCalled();
  });

  it('should retain the return type when input is an array', () => {
    expectTypeOf(oneOf([1, 2, 3, 4])).toEqualTypeOf<1 | 2 | 3 | 4>();
  });

  it('should retain the return type when input is an object', () => {
    jest.clearAllMocks();

    expectTypeOf(oneOf({ a: 1, b: 2, c: 3, d: 4 })[0]).toEqualTypeOf<
      'a' | 'b' | 'c' | 'd'
    >();
    expectTypeOf(oneOf({ a: 1, b: 2, c: 3, d: 4 })[1]).toEqualTypeOf<
      1 | 2 | 3 | 4
    >();
  });
});
