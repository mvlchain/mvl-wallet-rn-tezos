import React from 'react';

export const Center = 'center' as const;
export const Bottom = 'bottom' as const;

export type ModalType = typeof Center | typeof Bottom;
export interface ModalComponentProps {
  type: ModalType;
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onCancel?: Function;
  onConfirm?: Function;
  onClose?: Function;
  image?: React.ReactNode;
}

export interface ModalTypeProps {
  type: ModalType;
}
