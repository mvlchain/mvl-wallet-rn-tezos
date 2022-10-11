import React from 'react';

export interface ModalComponentProps {
  title: string;
  children?: React.ReactNode;
  onCancel?: Function;
  onConfirm?: Function;
  onClose?: Function;
  isVisible: boolean;
  type?: 'middle' | 'bottom';
}
