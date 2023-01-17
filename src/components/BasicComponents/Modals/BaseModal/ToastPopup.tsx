import React from 'react';

import Toast from 'react-native-toast-message';

import { TOAST_TYPE } from '@@constants/toastConfig.constant';

import * as S from './Modal.style';

export function ToastPopup() {
  const toastConfig = {
    [TOAST_TYPE.BASIC]: (props: any) => (
      <S.ToastPopupContainer>
        <S.ToastTextWrapper>
          <S.ToastText>{props.text1}</S.ToastText>
        </S.ToastTextWrapper>
      </S.ToastPopupContainer>
    ),
    [TOAST_TYPE.ERROR]: (props: any) => (
      <S.ToastPopupContainer>
        <S.ToastTextWrapper>
          <S.ToastErrorText>{props.text1}</S.ToastErrorText>
        </S.ToastTextWrapper>
      </S.ToastPopupContainer>
    ),
  };
  return <Toast config={toastConfig} position='bottom' bottomOffset={34} />;
}
