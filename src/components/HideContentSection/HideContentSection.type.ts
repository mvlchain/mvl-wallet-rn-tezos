import React from 'react';

export interface IHideContentSectionProps {
  isHide: boolean;
  onPress: () => void;
  description: string;
  btnLabel: string;
  children: React.ReactNode;
}
