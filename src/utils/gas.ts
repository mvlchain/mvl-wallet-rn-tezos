export const alphaNumericDecimalRegex = (decimal: number) => {
  // tokenDTO에 있는 decimals를 기준으로 입력 가능하게 자름
  return new RegExp(`^(\\d{0,60})([.]\\d{0,${decimal}})*?$`);
};

export const inputNumberFormatter = (value: string | undefined, tokenDecimal: number) => {
  if (!value) return null;
  // .으로 시작할 때 제외
  if (value === '.') return null;
  // 숫자, 소수점만 입력 가능, 소수점 token decimals까지만 입력 가능
  const regExp = alphaNumericDecimalRegex(tokenDecimal);
  if (!regExp.test(value)) return null;

  // 0이 여러개로 시작할 때 제외
  if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
    value = value.slice(1);
  }
  // 소수점 2개 제외
  if (value.indexOf('.') !== value.lastIndexOf('.')) {
    return null;
  }

  return value;
};
