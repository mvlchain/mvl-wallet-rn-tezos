export function isEmpty(str: string) {
  return !str || str.length === 0;
}

export function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}
