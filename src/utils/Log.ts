import { LogTag, LogConfigs } from './Log.type';

/**
 * Logger
 *
 * log.d('count: %d', 4)  // count: 4 to stdout
 * log.d('count: ', 5)    // count: 5 to stdout
 *
 * TODO:
 *  - write a performance log with console.timeLog function
 *  - sentry or tslog may also be able to integrate with this class
 */
const _logConfigs: LogConfigs = {
  tags: new Set<LogTag>(),
};
const _tags: Set<LogTag> = _logConfigs.tags;

/**
 * ex) setLogConfigs(['Auth', 'QrPay']);
 */
const setLogConfigs = (tags: Array<LogTag>) => {
  tags.forEach((tag) => {
    _tags.add(tag);
  });
};

const _assert = (tag: LogTag, value: boolean, message: any, ...params: any[]) => {
  if (__DEV__ && _tags.has(tag)) {
    params.length > 0 ? console.assert(value, `${tag}> ${message}`, params) : console.assert(value, `${tag}> ${message}`);
  }
};

const _debug = (tag: LogTag, message: any, ...params: any[]) => {
  if (__DEV__ && _tags.has(tag)) {
    params.length > 0 ? console.debug(`${tag}> ${message}`, params) : console.debug(`${tag}> ${message}`);
  }
};

const _error = (tag: LogTag, message: any, ...params: any[]) => {
  if (__DEV__ && _tags.has(tag)) {
    params.length > 0 ? console.error(`${tag}> ${message}`, params) : console.error(`${tag}> ${message}`);
  }
};

const _log = (tag: LogTag, message: any, ...params: any[]) => {
  if (__DEV__ && _tags.has(tag)) {
    params.length > 0 ? console.log(`${tag}> ${message}`, params) : console.log(`${tag}> ${message}`);
  }
};

const _trace = (tag: LogTag, message: any, ...params: any[]) => {
  if (__DEV__ && _tags.has(tag)) {
    params.length > 0 ? console.trace(`${tag}> ${message}`, params) : console.trace(`${tag}> ${message}`);
  }
};

const _warn = (tag: LogTag, message: any, ...params: any[]) => {
  if (__DEV__ && _tags.has(tag)) {
    params.length > 0 ? console.warn(`${tag}> ${message}`, params) : console.warn(`${tag}> ${message}`);
  }
};

/**
 * Set up tags
 */
setLogConfigs(['Auth', 'QrPay']);

const tagLogger = (tag: LogTag) => {
  return {
    assert: (tag: LogTag, value: boolean, message: any, ...params: any[]) => {
      _assert(tag, value, message, params);
    },
    debug: (message: any, ...params: any[]) => {
      _debug(tag, message, params);
    },
    error: (message: any, ...params: any[]) => {
      _error(tag, message, params);
    },
    log: (message: any, ...params: any[]) => {
      _log(tag, message, params);
    },
    trace: (message: any, ...params: any[]) => {
      _trace(tag, message, params);
    },
    wran: (message: any, ...params: any[]) => {
      _warn(tag, message, params);
    },
  };
};

const authLogger = tagLogger('Auth');
const qrPayLogger = tagLogger('QrPay');

export { tagLogger, authLogger, qrPayLogger };
