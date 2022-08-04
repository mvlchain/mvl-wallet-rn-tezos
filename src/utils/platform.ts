export const hasHexPrefix = (str: string): boolean => str.slice(0, 2) === '0x';

export function stripHexPrefix(str: string): string {
  return hasHexPrefix(str) ? str.slice(2) : str;
}
