import { SvgProps } from 'react-native-svg';

export interface IBottomSelectMenuProps {
  id: string;
  title: string;
  isSelected: boolean;
  Logo?: React.FC<SvgProps>;
  onPress: () => void;
}
