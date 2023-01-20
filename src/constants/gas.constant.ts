export const GAS_LEVEL = {
  LOW: 'LOW',
  MID: 'MID',
  HIGH: 'HIGH',
} as const;

export const GAS_UNIT = {
  GWEI: 'GWEI',
  MUTEZ: 'MUTEZ',
} as const;

export const GAS_UNIT_DECIMAL = {
  [GAS_UNIT.GWEI]: 9,
  [GAS_UNIT.MUTEZ]: 0,
} as const;

export type TGasUnit = keyof typeof GAS_UNIT;
export type TGasUnitDecimal = typeof GAS_UNIT_DECIMAL[keyof typeof GAS_UNIT];
export type TGasLevel = typeof GAS_LEVEL[keyof typeof GAS_LEVEL];

export type TGasHint = {
  text: string;
  color: string;
};
