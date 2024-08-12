import * as index from './index';

describe('index', () => {
  test('oneElementOf should be defined', () => {
    expect(index.oneElementOf).toBeDefined();
  });

  test('oneEntryOf should be defined', () => {
    expect(index.oneEntryOf).toBeDefined();
  });

  test('oneOf should be defined', () => {
    expect(index.oneOf).toBeDefined();
  });
});
