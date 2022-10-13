import React, { ReactComponentElement } from 'react';

export const Center = 'center' as const;
export const Bottom = 'bottom' as const;

export type ModalType = typeof Center | typeof Bottom;

export interface IModalComponentProps {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onCancel?: Function;
  onConfirm?: Function;
  onClose?: Function;
}

export interface IBaseModalComponentProps extends IModalComponentProps {
  type: ModalType;
}

export interface IModalTypeProps {
  type: ModalType;
}

//image
export interface IImageModalComponentProps extends IModalComponentProps {
  /**
   * @param image
   * Must have a width, height property with screen width as a value
   * @example <SVG width={SCREEN_WIDTH} height={SCREEN_WIDTH} />
   */
  image?: React.ReactNode;
}

//toast
export interface IToastPopupComponentProps {
  text: string;
}
