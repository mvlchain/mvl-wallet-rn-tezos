export function isEmpty(str?: string) {
  return !str || str.length === 0;
}

export function isNotEmpty(str?: string) {
  return !isEmpty(str);
}

export function isBlank(str?: string | null) {
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

export function extension(filename: string | undefined): string {
  if (filename?.length === 0) {
    return '';
  }
  const index = filename?.lastIndexOf('.') ?? -1;
  if (index == -1) {
    return '';
  }
  return !!filename ? filename.substring(filename.lastIndexOf('.') + 1, filename.length).toLowerCase() : '';
}
