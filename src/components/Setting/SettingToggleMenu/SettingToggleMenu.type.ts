export interface ISettingToggleMenuProps {
  title: string;
  subTitle?: string;
  isThickBorder?: boolean;
  isLast?: boolean;
  isChecked: boolean;
  onPress: () => void;
}
