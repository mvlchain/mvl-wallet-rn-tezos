export interface ICustomRadioProps {
  options: ICustomRadioOption[];
  defaultIdx?: number;
}

export interface ICustomRadioOption {
  label: string;
  onPress: () => void;
}

export interface ICustomRadioStylelProps {
  isFirst?: boolean;
  checked: boolean;
  isLast?: boolean;
}
