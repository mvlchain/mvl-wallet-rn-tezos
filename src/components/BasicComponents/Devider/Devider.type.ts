export const DEVIDER_THICKNESS = {
  THICK: 'thick',
  THIN: 'thin',
} as const;

export type TThickness = typeof DEVIDER_THICKNESS.THICK | typeof DEVIDER_THICKNESS.THIN;

export interface IDeviderProps {
  thickness: TThickness;
}
