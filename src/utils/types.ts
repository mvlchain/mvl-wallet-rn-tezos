export type valueOf<T> = T[keyof T];

export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
