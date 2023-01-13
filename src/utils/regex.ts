/**
 * https://github.com/defunctzombie/node-url/blob/master/url.js
 *
 * A url scheme patter using regex
 * ex) wallet://io.mvlchain.wallet
 * -> wallet:
 */
export const REGEX_URL_SCHEME = /^([a-z0-9.+-]+:)/i;

export const REGEX_METAMASK_ADDRESS = /^(\w+):(0x[a-fA-F0-9]{40})(@(\d))?$/;

export const evaluateUrlScheme = (url: string | unknown): string | undefined => {
  if (typeof url !== 'string') {
    return;
  }

  const schemes = REGEX_URL_SCHEME.exec(url);
  return schemes ? schemes[0] : undefined;
};

export const evaluateQueryString = (url: string | unknown): string | undefined => {
  if (typeof url !== 'string') {
    return;
  }

  const qs = url.split('?')[1];
  return qs ? qs : undefined;
};

export const assembleUrl = (scheme: string | null, host: string | null, pathname: string | null, query: string | null) => {
  let url = '';

  if (scheme) url += `${scheme}//`;
  if (host) url += `${host}`;
  if (pathname) url += `${pathname}`;
  if (query) url += `?${query}`;
  return url;
};
