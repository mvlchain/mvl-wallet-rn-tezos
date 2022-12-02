import { TimeDuration, TimeDurationUnit } from './TimeDuration.type';

const MINITE_UNIT = 60 * 1000;
const HOUR_UNIT = 60 * MINITE_UNIT;
const DAYS_UNIT = 24 * HOUR_UNIT;

/**
 * Time duration(target - source)
 *
 * getTimeDurationByByEventPhase() in UseCase
 *  eventStartAt
 *  eventEndAt
 *  claimStartAt
 *  claimEndAt
 *
 * @return TimeDuration object that priotised in the order as follows, days, hours, minutes.
 * otherwise return null if there's no duration at all in seconds.
 */
export const parseTimeDuration = (target: Date, current: Date = new Date()): TimeDuration | null => {
  // getTime() always use UTC in milliseconds
  const duration = target.getTime() - current.getTime();

  // days
  const days = Math.floor(duration / DAYS_UNIT);
  if (days > 0) {
    return {
      amount: days,
      unit: TimeDurationUnit.Day,
    };
  }

  // hours
  const hours = Math.floor(duration / HOUR_UNIT);
  if (hours > 0) {
    return {
      amount: hours,
      unit: TimeDurationUnit.Hour,
    };
  }

  // minutes
  const minutes = Math.floor(duration / MINITE_UNIT);
  if (minutes > 0) {
    return {
      amount: minutes,
      unit: TimeDurationUnit.Minute,
    };
  }

  return null;
};
