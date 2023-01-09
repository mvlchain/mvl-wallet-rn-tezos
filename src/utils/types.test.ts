import { isEmptyObject } from './types';

test(`isEmptyString success`, () => {
  expect(isEmptyObject({})).toBe(true);
});

test(`isEmptyString failure`, () => {
  expect(isEmptyObject({ a: 1, b: 2 })).toBe(false);
});

test(`isEmptyString failure`, () => {
  expect(isEmptyObject({ '': 1 })).toBe(false);
});
