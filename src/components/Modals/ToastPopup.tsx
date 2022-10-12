import React from 'react';

import Toast from 'react-native-toast-message';

import * as S from './styled';

export function ToastPopup() {
  const toastConfig = {
    basic: (props: any) => (
      <S.ToastPopupContainer>
        <S.ToastTextWrapper>
          <S.ToastText>{props.text1}</S.ToastText>
        </S.ToastTextWrapper>
      </S.ToastPopupContainer>
    ),
  };
  return <Toast config={toastConfig} position='bottom' bottomOffset={34} />;
}
