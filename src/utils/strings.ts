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
  let res = str;

  if (args.length == 0) {
    return str;
  }

  let i = 0;
  while (/%s/.test(res)) {
    res = res.replace('%s', args[i++]);
  }
  return res;
}
