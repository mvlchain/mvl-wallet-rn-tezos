import { SvgProps } from 'react-native-svg';

export interface IImageBackgroundModalProps {
  title: string;
  Image: React.FC<SvgProps>;
  description: string;
  onConfirm: Function;
  confirmLabel?: string;
}
