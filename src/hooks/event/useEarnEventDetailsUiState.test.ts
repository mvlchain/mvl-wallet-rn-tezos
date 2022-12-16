import qs from 'qs';

import { useEarnEventDetailsUiState } from './useEventDetailsUiState';

test('third-party url connectionDeepLink', () => {
  const uri = '***REMOVED***://io.mvlchain.tada?e=eventId';
  const url = new URL(uri);
  expect(url.searchParams.get('e')).toBe('eventId');
  expect(url.search).toBe('?e=eventId');
});

test('third-party url connectionDeepLink', () => {
  const uri = '***REMOVED***://io.mvlchain.tada';
  const url = new URL(uri);
  expect(url.search).toBe('');
});

test('third-party url add new query param', () => {
  const uri = '***REMOVED***://io.mvlchain.tada';
  const url = new URL(uri);
  url.searchParams.set('i', 'darby');
  expect(url.searchParams.toString()).toBe('i=darby');
});

test('third-party url change existing query param', () => {
  const uri = '***REMOVED***://io.mvlchain.tada?i=mvl';
  const url = new URL(uri);
  url.searchParams.set('i', 'darby');
  expect(url.searchParams.toString()).toBe('i=darby');
});

test('third-party url protocol host', () => {
  const uri = '***REMOVED***://io.mvlchain.tada?i=mvl';
  const url = new URL(uri);
  expect(url.protocol).toBe('***REMOVED***:');
  expect(url.host).toBe('io.mvlchain.tada');
  expect(url.search).toBe('?i=mvl');
});

test('third-party no protocol', () => {
  const uri = 'io.mvlchain.tada?i=mvl';
  const url = new URL(uri);
  expect(url.protocol).toBe('***REMOVED***:');
  expect(url.host).toBe('io.mvlchain.tada');
  expect(url.search).toBe('?i=mvl');
});

test('third-party url new param', () => {
  const uri = '***REMOVED***://io.mvlchain.tada?i=mvl';
  const url = new URL(uri);
  url.searchParams.set('e', 'darby');
  expect(url.toString()).toBe('***REMOVED***://io.mvlchain.tada?i=mvl&e=darby');
});

test('third-party url parse qs', () => {
  const params = qs.parse('?e=eventId'.replace('?', ''));
  expect(params).toStrictEqual({
    e: 'eventId',
  });
});
