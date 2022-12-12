import { format } from './strings';

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
