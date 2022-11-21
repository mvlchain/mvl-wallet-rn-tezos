const setComma = (num: string | number) => {
  num = num.toString();
  const split = num.split('.');
  if (split.length > 1) {
    const integer = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimal = split[1];

    if (decimal === '') {
      return num;
    } else {
      return `${integer}.${decimal}`;
    }
  } else {
    const integer = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return integer;
  }
};

const removeComma = (num: string) => {
  return num.replace(/,/g, '');
};

const cut = (num: number | string, cutNum: number, useComma?: boolean) => {
  num = parseFloat(num.toString());
  const c = Math.pow(10, cutNum);

  if (useComma) {
    return setComma(Math.floor(num * c) / c);
  } else {
    return (Math.floor(num * c) / c).toString();
  }
};

const stringToNum = (text: string, cutNum?: number) => {
  let num = text.replace(/[^\.0-9]/g, '');
  if (text === '') {
    num = '';
  } else if (text.split('.').length > 2) {
    num = text.substring(0, text.lastIndexOf('.'));
  } else if (text.indexOf('.') > -1 && ((cutNum && text.length - 1 - text.indexOf('.') <= cutNum) || cutNum === undefined)) {
    num = text;
  } else if (cutNum !== undefined) {
    num = cut(text, cutNum);
  }

  return num;
};

export default { setComma, removeComma, cut, stringToNum };
