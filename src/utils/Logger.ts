import { LogTag, LogConfigs } from './Logger.type';

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
  if (_tags.size === 0 || _tags.has(tag)) {
    console.assert(value, `${tag}> ${message}`, params);
  }
};

const _debug = (tag: LogTag, message: any, ...params: any[]) => {
  if (_tags.size === 0 || _tags.has(tag)) {
    console.debug(`${tag}> ${message}`, params);
  }
};

const _error = (tag: LogTag, message: any, ...params: any[]) => {
  if (_tags.size === 0 || _tags.has(tag)) {
    console.error(`${tag}> ${message}`, params);
  }
};

const _log = (tag: LogTag, message: any) => {
  if (_tags.size === 0 || _tags.has(tag)) {
    console.log(`${tag}> ${message}`);
  }
};
const _logWithParams = (tag: LogTag, message: any, ...params: any[]) => {
  if (_tags.size === 0 || _tags.has(tag)) {
    console.log(`${tag}> ${message}`, params);
  }
};

const _trace = (tag: LogTag, message: any, ...params: any[]) => {
  if (_tags.size === 0 || _tags.has(tag)) {
    console.trace(`${tag}> ${message}`, params);
  }
};

const _warn = (tag: LogTag, message: any, ...params: any[]) => {
  if (_tags.size === 0 || _tags.has(tag)) {
    console.warn(`${tag}> ${message}`, params);
  }
};

const tagLogger = (tag: LogTag) => {
  return {
    assert: (value: boolean, message: any, ...params: any[]) => {
      if (__DEV__) {
        params.length > 0 ? _assert(tag, value, message, params) : _assert(tag, value, message);
      }
    },
    debug: (message: any, ...params: any[]) => {
      if (__DEV__) {
        params.length > 0 ? _debug(tag, message, params) : _debug(tag, message);
      }
    },
    error: (message: any, ...params: any[]) => {
      if (__DEV__) {
        params.length > 0 ? _error(tag, message, params) : _error(tag, message);
      }
    },
    log: (message: any, ...params: any[]) => {
      if (__DEV__) {
        params.length > 0 ? _logWithParams(tag, message, params) : _log(tag, message);
      }
    },
    trace: (message: any, ...params: any[]) => {
      if (__DEV__) {
        params.length > 0 ? _trace(tag, message, params) : _trace(tag, message);
      }
    },
    warn: (message: any, ...params: any[]) => {
      if (__DEV__) {
        params.length > 0 ? _warn(tag, message, params) : _warn(tag, message);
      }
    },
  };
};

export { setLogConfigs, tagLogger };
