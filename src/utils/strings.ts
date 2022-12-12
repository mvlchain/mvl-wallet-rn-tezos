export function isEmpty(str?: string) {
  return !str || str.length === 0;
}

export function isNotEmpty(str?: string) {
  return !isEmpty(str);
}

export function isBlank(str?: string) {
  return !str || /^\s*$/.test(str);
}

export function isNotBlank(str?: string) {
  return !isBlank(str);
}

export function format(str: string, ...args: string[]): string {
  let res = str,
    i = 0;

  if (args.length == 0) {
    return str;
  }

  while (/%s/.test(res)) {
    res = str.replace('%s', args[i++]);
  }
  return res;
}
