/**
 * https://github.com/defunctzombie/node-url/blob/master/url.js
 *
 * A url scheme patter using regex
 * ex) wallet://io.mvlchain.wallet
 * -> wallet:
 */
const REGEX_URL_SCHEME = /^([a-z0-9.+-]+:)/i;

export const evaluateUrlScheme = (url: string | unknown): string | undefined => {
  if (typeof url !== 'string') {
    return;
  }

  const schemes = REGEX_URL_SCHEME.exec(url);
  return schemes ? schemes[0] : undefined;
};

export const assembleUrl = (scheme: string | null, host: string | null, pathname: string | null, query: string | null) => {
  let url = '';

  if (scheme) url += `${scheme}//`;
  if (host) url += `${host}`;
  if (pathname) url += `${pathname}`;
  if (query) url += `?${query}`;
  return url;
};