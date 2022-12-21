import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

export type dateType = Date | string | number;

export const setTimeZone = (date: dateType, timezone?: string) => {
  const tz = timezone ?? 'Asia/Seoul';
  return moment.tz(date, tz);
};
export const dateFormatter = (date: string) => {
  const tz = RNLocalize.getTimeZone();
  const formedUpdatedAt = setTimeZone(moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('YYYY-MM-DD HH:MM'), tz);
  return formedUpdatedAt.format('YYYY-MM-DD HH:MM');
};
