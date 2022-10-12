import React from 'react';

export const Center = 'center' as const;
export const Bottom = 'bottom' as const;

export type ModalType = typeof Center | typeof Bottom;

export interface ModalComponentProps {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onCancel?: Function;
  onConfirm?: Function;
  onClose?: Function;
}

export interface BaseModalComponentProps extends ModalComponentProps {
  type: ModalType;
}

export interface ModalTypeProps {
  type: ModalType;
}

//image
export interface ImageModalComponentProps extends ModalComponentProps {
  /**
   * @param image
   * Must have a width, height property with screen width as a value
   * @example <SVG width={SCREEN_WIDTH} height={SCREEN_WIDTH} />
   */
  image?: React.ReactNode;
}

//toast
export interface ToastPopupComponentProps {
  text: string;
}
