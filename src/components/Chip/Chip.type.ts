export interface IChipProps {
  onPress?: () => void;
  isMultiple?: boolean;
  label: string;
  chipPosition?: TChipPosition;
}

export type TChipPosition = 'left' | 'center' | 'right';
