//for transaction history
//server response ex) 2022-12-12T11:18:10.52Z
//ui date format ex) 22.12.12 11:18
export const getDateFormat = (str: string, includeAmPm?: boolean) => {
  const [YYYY, MM, DD, hh, mm, ETC] = str.split(/\s*(?:-|:|T|$)\s*/);
  const YY = YYYY.substring(2);
  const ampm = Number(hh) < 12 ? 'am' : 'pm';
  return `${YY}.${MM}.${DD} ${hh}:${mm}${includeAmPm ? ' ' + ampm : ''}`;
};
