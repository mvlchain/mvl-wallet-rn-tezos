import { format, extension } from './strings';

it('format string', () => {
  const res = format('hello %s world', 'Darby');
  expect(res).toBe('hello Darby world');
});

it('format string with no arguments', () => {
  const res = format('hello %s world');
  expect(res).toBe('hello %s world');
});

it('format string with extra arguments', () => {
  const res = format('hello %s world', 'Darby', 'Wow');
  expect(res).toBe('hello Darby world');
});

it('format string: transaction fee', () => {
  const res = format('Transaction Fee : %s %s', '100', 'bMVL');
  expect(res).toBe('Transaction Fee : 100 bMVL');
});

it('extract file extension', () => {
  const ext = extension('https://hello.svg');
  expect(ext).toBe('svg');
});

it('extract empty file extension', () => {
  const ext = extension('https://hello');
  expect(ext).toBe('');
});
