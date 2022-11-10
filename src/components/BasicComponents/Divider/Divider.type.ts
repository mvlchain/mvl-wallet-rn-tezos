export const DIVIDER_THICKNESS = {
  THICK: 'thick',
  THIN: 'thin',
} as const;

export type TThickness = typeof DIVIDER_THICKNESS.THICK | typeof DIVIDER_THICKNESS.THIN;

export interface IDividerProps {
  thickness: TThickness;
}
