import React from 'react';

import { SvgProps } from 'react-native-svg';

export interface IDappListItemProps {
  Image: string | React.FC<SvgProps>;
  title: string;
  description: string;
  onPress: () => void;
}
