export const getTezosDecimalUnit = (decimals: number) => {
  switch (decimals) {
    case 6:
      return 'tz';
    case 3:
      return 'mtz';
    case 0:
    default:
      return 'mutez';
  }
};
