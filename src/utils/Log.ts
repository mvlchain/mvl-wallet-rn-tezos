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

// class Log {
//   constructor() { }

//   // ASSERT
//   // writes a message if `value` is false
//   a(value: boolean, message?: any, params?: Array<any>) {
//     if (__DEV__) {
//       console.assert(value, message, params);
//     }
//   }

//   // ERROR
//   e(message?: any, params?: Array<any>) {
//     if (__DEV__) {
//       console.error(message, params);
//     }
//   }

//   // DEBUG alias for LOG
//   d(message: any) {
//     if (__DEV__) {
//       console.debug(message);
//     }
//   }

//   // LOG
//   l(message?: any, params?: Array<any>) {
//     if (__DEV__) {
//       console.log(message, params);
//     }
//   }

//   // TRACE
//   t(message?: any, params?: Array<any>) {
//     if (__DEV__) {
//       console.trace(message, params);
//     }
//   }

//   // WARN
//   w(message?: any, params?: Array<any>) {
//     if (__DEV__) {
//       console.warn(message, params);
//     }
//   }
// }

/**
 * ex) setLogConfigs(['Auth', 'QrPay']);
 */
const setLogConfigs = (tags: Array<LogTag>) => {
  tags.forEach((tag) => {
    _tags.add(tag);
  });
};

const debug = (...message: any[]) => {
  if (__DEV__) {
    console.debug(message);
  }
};

const tagDebug = (tag: LogTag, message: any) => {
  if (__DEV__ && _tags.has(tag)) {
    console.debug(`${tag}> ${message}`);
  }
};

const log = (...message: any[]) => {
  if (__DEV__) {
    console.log(message);
  }
};

const tagLog = (tag: LogTag, message: any) => {
  if (__DEV__ && _tags.has(tag)) {
    console.log(`${tag}> ${message}`);
  }
};

/**
 * Set up tags
 */
setLogConfigs(['Auth', 'QrPay']);

export { log, tagLog };
