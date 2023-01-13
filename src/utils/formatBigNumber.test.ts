import { BigNumber } from 'bignumber.js';

import { formatBigNumber } from './formatBigNumber';

test('formatBigNumber wei to eth', () => {
  const res = formatBigNumber(new BigNumber('1200000000000000000'), 18);
  expect(res.toString()).toBe('1.2');
});

test('formatBigNumber eth to wei', () => {
  const res = new BigNumber('1.2').shiftedBy(18);
  expect(res.toString()).toBe('1200000000000000000');
});
