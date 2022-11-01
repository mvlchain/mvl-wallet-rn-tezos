import React from 'react';

export const Center = 'center' as const;
export const Bottom = 'bottom' as const;

export type TModalPosition = typeof Center | typeof Bottom;
export interface IModalComponentProps {
  title: string;
  isVisible: boolean;
  onCancel?: Function;
  cancelLabel?: string;
  onConfirm?: Function;
  confirmLabel?: string;
  isConfirmDisabled?: boolean;
  onClose?: Function;
  children?: React.ReactNode;
}

export interface IBaseModalComponentProps extends IModalComponentProps {
  modalPosition: TModalPosition;
}

export interface IModalTypeProps {
  modalPosition: TModalPosition;
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
