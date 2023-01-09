import Url from 'url';

import QueryString from 'qs';

import { assembleUrl, evaluateUrlScheme, evaluateQueryString } from '@@utils/regex';

test('url scheme', () => {
  const url = 'clutch://io.mvlchain.wallet';
  const scheme = evaluateUrlScheme(url);
  expect(scheme).toBe('clutch:');
});

test('evaluate query string', () => {
  const qs = evaluateQueryString('clutch://io.mvlchain.wallet/mvlpath?i=id&a=alias');
  expect(qs).toBe('i=id&a=alias');
});

test('evaluate empty query string', () => {
  const qs = evaluateQueryString('clutch://io.mvlchain.wallet/mvlpath');
  expect(qs).toBe(undefined);
});

test('url query string', () => {
  const url = Url.parse('clutch://io.mvlchain.wallet/mvlpath?i=id&a=alias');
  expect(url.protocol).toBe('clutch:');
  expect(url.query).toBe('i=id&a=alias');
});

test('url query string', () => {
  const url = Url.parse('clutch://io.mvlchain.wallet/mvlpath?i=id&a=alias', true);
  const query = url.query;
  query.i = 'new-id';

  const res = assembleUrl(url.protocol, url.host, url.pathname, QueryString.stringify(query));
  expect(res).toBe('clutch://io.mvlchain.wallet/mvlpath?i=new-id&a=alias');
});
